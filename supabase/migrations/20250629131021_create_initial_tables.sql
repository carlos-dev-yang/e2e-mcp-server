-- users 테이블
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- projects 테이블
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  owner_id uuid REFERENCES users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- test_scenarios 테이블
CREATE TABLE test_scenarios (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id),
  name text NOT NULL,
  description text,
  gherkin_content text, -- Gherkin-like 시나리오 내용
  created_at timestamp with time zone DEFAULT now()
);

-- test_executions 테이블
CREATE TABLE test_executions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id uuid REFERENCES test_scenarios(id),
  status text NOT NULL, -- e.g., 'pending', 'running', 'completed', 'failed'
  started_at timestamp with time zone DEFAULT now(),
  finished_at timestamp with time zone
);

-- test_results 테이블
CREATE TABLE test_results (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id uuid REFERENCES test_executions(id),
  step_name text,
  status text NOT NULL, -- e.g., 'pass', 'fail', 'skip'
  message text,
  screenshot_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- snapshots 테이블 (테스트 실행 중 캡처된 스크린샷 등)
CREATE TABLE snapshots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  result_id uuid REFERENCES test_results(id),
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
