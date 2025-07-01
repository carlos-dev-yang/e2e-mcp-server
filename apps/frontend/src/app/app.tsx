import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScenarioPage } from '../pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/scenario" replace />} />
        <Route path="/scenario" element={<ScenarioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
