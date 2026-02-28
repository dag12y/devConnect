import axiosInstance, { extractErrorMessages } from "../../../utils/axiosInstance";
import { setAlert } from "../alert/alert";
import {
    clearRepos,
    createProfile,
    profilesLoaded,
    profileError,
    profileLoaded,
    profileRequest,
    reposError,
    reposLoaded,
    reposRequest,
    viewedProfileLoaded,
} from "./profileSlice";

export function loadMyProfile() {
    return async function (dispatch) {
        dispatch(profileRequest());
        try {
            const response = await axiosInstance.get("/profile/me");
            const profile = response.data?.data || response.data;
            dispatch(profileLoaded(profile));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            const isNoProfileError = messages.some(function (msg) {
                return msg === "There is no profile for this user";
            });
            if (!isNoProfileError) {
                messages.forEach(function (msg) {
                    dispatch(setAlert(msg, "error"));
                });
            }
            dispatch(profileError(messages.join(", ")));
            return false;
        }
    };
}

export function loadProfiles() {
    return async function (dispatch) {
        dispatch(profileRequest());
        try {
            const response = await axiosInstance.get("/profile");
            const profiles = response.data?.data || [];
            dispatch(profilesLoaded(profiles));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            dispatch(profileError(messages.join(", ")));
            return false;
        }
    };
}

export function loadProfileByUserId(userId) {
    return async function (dispatch) {
        dispatch(profileRequest());
        try {
            const response = await axiosInstance.get(`/profile/${userId}`);
            const profile = response.data?.data || response.data;
            dispatch(viewedProfileLoaded(profile));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            dispatch(profileError(messages.join(", ")));
            return false;
        }
    };
}

export function createOrUpdateProfile(formData, navigate) {
    return async function (dispatch) {
        dispatch(profileRequest());
        try {
            const response = await axiosInstance.post("/profile", formData);
            const profile = response.data?.data || response.data;
            dispatch(createProfile(profile));
            dispatch(setAlert("Profile created/updated successfully", "success"));
            navigate("/profile");
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            dispatch(profileError(messages.join(", ")));
            return false;
        }
    };
}

export function loadGithubRepos(username) {
    return async function (dispatch) {
        if (!username) {
            dispatch(clearRepos());
            return false;
        }

        dispatch(reposRequest());
        try {
            const response = await axiosInstance.get(`/profile/github/${username}`);
            const repos = response.data?.data || [];
            dispatch(reposLoaded(repos));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            dispatch(reposError(messages.join(", ")));
            return false;
        }
    };
}

export function addExperience(formData) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.put("/profile/experience", formData);
            const profile = response.data?.data || response.data;
            dispatch(createProfile(profile));
            dispatch(setAlert("Experience added successfully", "success"));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            return false;
        }
    };
}

export function addEducation(formData) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.put("/profile/education", formData);
            const profile = response.data?.data || response.data;
            dispatch(createProfile(profile));
            dispatch(setAlert("Education added successfully", "success"));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            return false;
        }
    };
}
