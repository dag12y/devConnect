import axiosInstance, { extractErrorMessages } from "../../../utils/axiosInstance";
import { setAlert } from "../alert/alert";
import { userLoggedOut } from "../auth/authSlice";
import {
    clearRepos,
    clearProfile,
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
            await axiosInstance.put("/profile/experience", formData);
            await dispatch(loadMyProfile());
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
            await axiosInstance.put("/profile/education", formData);
            await dispatch(loadMyProfile());
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

export function deleteExperience(expId) {
    return async function (dispatch) {
        try {
            await axiosInstance.delete(`/profile/experience/${expId}`);
            await dispatch(loadMyProfile());
            dispatch(setAlert("Experience deleted", "success"));
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

export function deleteEducation(eduId) {
    return async function (dispatch) {
        try {
            await axiosInstance.delete(`/profile/education/${eduId}`);
            await dispatch(loadMyProfile());
            dispatch(setAlert("Education deleted", "success"));
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

export function deleteAccount() {
    return async function (dispatch) {
        try {
            await axiosInstance.delete("/profile");
            localStorage.removeItem("token");
            dispatch(clearProfile());
            dispatch(userLoggedOut());
            dispatch(setAlert("Account deleted successfully", "success"));
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
