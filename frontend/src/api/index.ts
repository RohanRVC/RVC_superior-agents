import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface BuildRequest {
  idea: string;
  model: 'openai' | 'claude' | 'openrouter';
  mode: 'demo' | 'continuous';
  apiKey?: string;
}

export interface BuildResponse {
  projectId: string;
  status: 'success' | 'error';
  message?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  fileCount: number;
  createdAt: string;
}

export interface ProjectFile {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: ProjectFile[];
}

export interface FileContent {
  content: string;
  language: string;
}

// API functions
export const buildProject = async (buildData: BuildRequest): Promise<BuildResponse> => {
  try {
    const response = await api.post('/build', buildData);
    return response.data;
  } catch (error) {
    console.error('Error building project:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (projectId: string): Promise<Project> => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

export const getProjectFiles = async (projectId: string): Promise<ProjectFile[]> => {
  try {
    const response = await api.get(`/projects/${projectId}/files`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching files for project ${projectId}:`, error);
    throw error;
  }
};

export const getFileContent = async (projectId: string, filePath: string): Promise<FileContent> => {
  try {
    const response = await api.get(`/projects/${projectId}/files/${encodeURIComponent(filePath)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching file content for ${filePath}:`, error);
    throw error;
  }
};

export const getLogs = async (projectId: string): Promise<string[]> => {
  try {
    const response = await api.get(`/projects/${projectId}/logs`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching logs for project ${projectId}:`, error);
    throw error;
  }
};

export const downloadProject = async (projectId: string): Promise<Blob> => {
  try {
    const response = await api.get(`/projects/${projectId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error(`Error downloading project ${projectId}:`, error);
    throw error;
  }
};

export default api;