import { addJobToQueue, TestJob } from '../../worker/src/queue'; // 워커 큐 모듈 import
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화 (백엔드에서 사용)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and Service Role Key must be provided in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

/**
 * 테스트 실행을 오케스트레이션하는 함수.
 * 테스트 요청을 받아 큐에 추가하고, 실행 상태를 관리합니다.
 */
export async function orchestrateTestExecution(scenarioId: string, browser: TestJob['browser']): Promise<string> {
  // 1. test_executions 테이블에 새로운 실행 레코드 생성
  const { data: execution, error: executionError } = await supabase
    .from('test_executions')
    .insert([{ scenario_id: scenarioId, status: 'queued' }])
    .select()
    .single();

  if (executionError || !execution) {
    throw new Error(`Failed to create test execution record: ${executionError?.message}`);
  }

  const executionId = execution.id;

  // 2. 워커 큐에 작업 추가
  const job: TestJob = {
    scenarioId,
    executionId,
    browser,
  };
  await addJobToQueue(job);

  console.log(`Test execution ${executionId} queued for scenario ${scenarioId} on ${browser}`);

  return executionId;
}

/**
 * 워커로부터 테스트 결과를 수집하고 데이터베이스에 저장하는 더미 함수.
 * 실제로는 워커가 테스트 실행 후 백엔드 API를 호출하여 결과를 전송합니다.
 */
export async function collectTestResult(result: any) {
  console.log('Collecting test result:', result);
  // test_results 테이블에 결과 저장
  const { data, error } = await supabase.from('test_results').insert([result]).select();
  if (error) {
    console.error('Error saving test result:', error.message);
  }
  // test_executions 상태 업데이트
  await supabase.from('test_executions').update({ status: result.status }).eq('id', result.executionId);
}
