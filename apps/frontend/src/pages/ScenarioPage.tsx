import React from 'react';
import { ScenarioEditor } from '../components';

const ScenarioPage: React.FC = () => {
  return (
    <div>
      <h1>Scenario Management</h1>
      <ScenarioEditor />
      {/* 시나리오 관리 페이지 내용 */}
    </div>
  );
};

export default ScenarioPage;
