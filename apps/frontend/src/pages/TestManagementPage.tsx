import React from 'react';
import { TestMonitor, ResultsVisualization } from '../components';

const TestManagementPage: React.FC = () => {
  return (
    <div>
      <h1>Test Management</h1>
      <TestMonitor />
      <ResultsVisualization />
      {/* 테스트 관리 페이지 내용 */}
    </div>
  );
};

export default TestManagementPage;
