-- RLS 활성화 및 anon SELECT 정책
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select all on users"
ON users FOR SELECT
TO anon
USING (true);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select all on projects"
ON projects FOR SELECT
TO anon
USING (true);

ALTER TABLE test_scenarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select all on test_scenarios"
ON test_scenarios FOR SELECT
TO anon
USING (true);

ALTER TABLE test_executions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select all on test_executions"
ON test_executions FOR SELECT
TO anon
USING (true);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select all on test_results"
ON test_results FOR SELECT
TO anon
USING (true);

ALTER TABLE snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select all on snapshots"
ON snapshots FOR SELECT
TO anon
USING (true);
