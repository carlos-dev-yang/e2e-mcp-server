import { create } from 'zustand';

interface Project {
  id: string;
  name: string;
}

interface ProjectState {
  selectedProjectId: string | null;
  projects: Project[];
  setSelectedProjectId: (id: string | null) => void;
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  selectedProjectId: null,
  projects: [],
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  setProjects: (projects) => set({ projects }),
}));
