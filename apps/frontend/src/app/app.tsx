import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage, ScenarioPage, DashboardPage, TestManagementPage } from '../pages';
import { Toaster, toast } from 'react-hot-toast'; // react-hot-toast import

export function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/scenario">Scenario</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/test-management">Test Management</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenario" element={<ScenarioPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/test-management" element={<TestManagementPage />} />
      </Routes>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
      {/* 테스트를 위한 버튼 (임시) */}
      <button onClick={() => toast.success('Hello from toast!')}>Show Toast</button>
    </BrowserRouter>
  );
}

export default App;
