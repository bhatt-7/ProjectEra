import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectData: [],
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectData(state, action) {
            state.projectData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        deleteProject(state, action) {
            state.projectData = state.projectData.filter(project => project._id !== action.payload);
        }
    },
});

export const { setProjectData, setLoading, setError, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
