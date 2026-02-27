import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    profiles: [],
    repos:[],
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        profileLoaded(state, action) {
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
        },
        createProfile(state, action) {
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
        },
        clearProfile(state) {   
            state.profile = null;
            state.profiles = [];
            state.repos = [];
            state.loading = false;
            state.error = null;
        },
        profileError(state, action) {
            state.profile = null;
            state.loading = false;
            state.error = action.payload || "Failed to load profile";
        },
    },
});

export const { profileRequest, profileLoaded, createProfile, clearProfile, profileError } =
    profileSlice.actions;

export default profileSlice.reducer;
