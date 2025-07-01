import React, { useEffect } from 'react';
import { Dashboard } from '../components';
import { useProjectStore } from '../store/useProjectStore';

const DashboardPage: React.FC = () => {
  const { projects, selectedProjectId, setProjects, setSelectedProjectId } = useProjectStore();

  useEffect(() => {
    // 실제 API 호출을 통해 프로젝트 목록을 가져오는 로직이 여기에 들어갑니다.
    // 현재는 더미 데이터로 대체합니다.
    const dummyProjects = [
      { id: 'proj1', name: 'Project Alpha' },
      { id: 'proj2', name: 'Project Beta' },
      { id: 'proj3', name: 'Project Gamma' },
    ];
    setProjects(dummyProjects);
  }, [setProjects]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjectId(event.target.value);
  };

  return (
    <div>
      <h1>Project Dashboard</h1>
      <div>
        <label htmlFor="project-select">Select Project:</label>
        <select id="project-select" value={selectedProjectId || ''} onChange={handleProjectChange}>
          <option value="">-- Select a project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProjectId ? (
        <p>Selected Project ID: {selectedProjectId}</p>
      ) : (
        <p>No project selected.</p>
      )}
      <Dashboard />
      {/* 대시보드 페이지 내용 */}{' '}
    </div>
  );
};

export default DashboardPage;