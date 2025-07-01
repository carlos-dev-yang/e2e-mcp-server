import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
});

const QUEUE_NAME = 'test_execution_queue';

export interface TestJob {
  scenarioId: string;
  executionId: string;
  browser: 'chromium' | 'firefox' | 'webkit';
}

/**
 * 큐에 새로운 테스트 작업을 추가합니다.
 */
export async function addJobToQueue(job: TestJob): Promise<number> {
  const jobString = JSON.stringify(job);
  return redis.lpush(QUEUE_NAME, jobString);
}

/**
 * 큐에서 다음 테스트 작업을 가져옵니다.
 */
export async function getJobFromQueue(): Promise<TestJob | null> {
  const jobString = await redis.rpop(QUEUE_NAME);
  if (jobString) {
    return JSON.parse(jobString) as TestJob;
  }
  return null;
}

/**
 * 큐에서 작업을 지속적으로 처리하는 워커 함수.
 */
export async function startWorker(processJob: (job: TestJob) => Promise<void>) {
  console.log('Worker started, listening for jobs...');
  while (true) {
    const jobString = await redis.brpop(QUEUE_NAME, 0); // 큐에 작업이 있을 때까지 블록
    if (jobString) {
      const job: TestJob = JSON.parse(jobString[1]);
      console.log('Processing job:', job);
      try {
        await processJob(job);
        console.log('Job processed successfully:', job);
      } catch (error) {
        console.error('Error processing job:', job, error);
        // 실패한 작업 재시도 로직 또는 에러 큐로 이동
      }
    }
  }
}
