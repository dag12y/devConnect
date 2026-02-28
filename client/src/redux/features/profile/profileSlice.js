import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myProfile: null,
    viewedProfile: null,
    profiles: [],
    repos: [],
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
            state.myProfile = action.payload;
            state.loading = false;
            state.error = null;
        },
        createProfile(state, action) {
            state.myProfile = action.payload;
            state.loading = false;
            state.error = null;
        },
        viewedProfileLoaded(state, action) {
            state.viewedProfile = action.payload;
            state.loading = false;
            state.error = null;
        },
        profilesLoaded(state, action) {
            state.profiles = action.payload;
            state.loading = false;
            state.error = null;
        },
        clearProfile(state) {
            state.myProfile = null;
            state.viewedProfile = null;
            state.profiles = [];
            state.repos = [];
            state.loading = false;
            state.error = null;
        },
        profileError(state, action) {
            state.loading = false;
            state.error = action.payload || "Failed to load profile";
        },
    },
});

export const {
    profileRequest,
    profileLoaded,
    createProfile,
    viewedProfileLoaded,
    profilesLoaded,
    clearProfile,
    profileError,
} = profileSlice.actions;

export default profileSlice.reducer;
