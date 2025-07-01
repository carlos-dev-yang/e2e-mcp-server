import 'dotenv/config';
import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { orchestrateTestExecution } from './orchestrator'; // orchestrator import

const app = new Hono();

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and Service Role Key must be provided in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// HTTP 서버 생성 (Hono 앱을 핸들러로 사용)
const server = createServer(app.fetch);

// WebSocket 서버 생성
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.send('Welcome to the WebSocket server!');
});

// 오류 처리 미들웨어
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// Scenarios API (Zod 유효성 검사 추가)
const scenarioSchema = z.object({
  name: z.string().min(1, 'Scenario name is required'),
  description: z.string().optional(),
  gherkin_content: z.string().optional(),
  project_id: z.string().uuid('Invalid project ID format'),
});

app.post('/scenarios', async (c) => {
  try {
    const body = await c.req.json();
    const validatedBody = scenarioSchema.parse(body); // 유효성 검사

    const { data, error } = await supabase.from('test_scenarios').insert([validatedBody]).select();

    if (error) {
      throw new HTTPException(500, { message: error.message });
    }
    return c.json({ message: 'Scenario created/updated', data }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new HTTPException(400, { message: 'Validation failed', res: c.json({ errors: error.errors }, 400) });
    }
    throw error;
  }
});

// Tests API (list)
app.get('/tests', async (c) => {
  const { data, error } = await supabase.from('test_executions').select('*');

  if (error) {
    throw new HTTPException(500, { message: error.message });
  }
  return c.json({ tests: data });
});

// Tests API (execute)
const testExecutionRequestSchema = z.object({
  scenario_id: z.string().uuid('Invalid scenario ID format'),
  browser: z.enum(['chromium', 'firefox', 'webkit']).default('chromium'),
});

app.post('/tests', async (c) => {
  try {
    const body = await c.req.json();
    const { scenario_id, browser } = testExecutionRequestSchema.parse(body);

    // 테스트 실행 오케스트레이션
    const executionId = await orchestrateTestExecution(scenario_id, browser);

    return c.json({ message: 'Test execution initiated', executionId }, 200);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new HTTPException(400, { message: 'Validation failed', res: c.json({ errors: error.errors }, 400) });
    }
    throw error;
  }
});

// Results API
app.get('/results/:id', async (c) => {
  const { id } = c.req.param();
  const { data, error } = await supabase.from('test_results').select('*').eq('execution_id', id);

  if (error) {
    throw new HTTPException(500, { message: error.message });
  }
  return c.json({ result: data });
});

// 서버 시작
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
