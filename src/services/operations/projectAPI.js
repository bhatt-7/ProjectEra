import { apiConnector } from "../apiConnector";
import { setProjectData, setLoading, setError, deleteProject } from "../../slices/projectSlice";
import { useNavigate } from "react-router-dom";
const GET_ALL_PROJECTS_API = "http://localhost:5000/api/users/user-projects";
export function uploadProject(projectData, navigate) {
  const UPLOAD_PROJECT_API = "http://localhost:5000/api/users/projects";

  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", UPLOAD_PROJECT_API, projectData);

      console.log("UPLOAD PROJECT API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProjectData(response.data.project));
      navigate("/login"); // You might want to navigate to the project page instead of login
    } catch (error) {
      console.error("UPLOAD PROJECT API ERROR:", error);
      dispatch(setError(error.message)); // Set error state
    }
    dispatch(setLoading(false));
  };
}

export const getAllProjects = async () => {
  let result = [];
  try {
    const response = await apiConnector('GET', GET_ALL_PROJECTS_API);
    if (!response?.data?.projects) {
      throw new Error('Could not fetch projects');
    }
    result = response?.data?.projects;
  } catch (error) {
    console.error('GET_ALL_PROJECTS_API API ERROR:', error);
  }
  return result;
};

export const downloadProjectFiles = async (projectId) => {
  const DOWNLOAD_PROJECT_FILES_API = `http://localhost:5000/api/users/projects/${projectId}/download`;
  try {
    const response = await apiConnector('GET', DOWNLOAD_PROJECT_FILES_API);
    return response;
  } catch (error) {
    console.error('DOWNLOAD_PROJECT_FILES_API API ERROR:', error);
    throw error;
  }
};

export const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const projects = await getAllProjects();
    dispatch(setProjectData(projects));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeProject = (projectId) => async (dispatch) => {
  try {
    await deleteProject(projectId);
    dispatch(deleteProject(projectId));
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};
