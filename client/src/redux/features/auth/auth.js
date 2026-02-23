import axiosInstance, { extractErrorMessages } from "../../../utils/axiosInstance";
import { setAlert } from "../alert/alert";
import {
    authRequest,
    registerSuccess,
    loginSuccess,
    userLoaded,
    authError,
} from "./authSlice";

export function loadUser() {
    return async function (dispatch) {
        dispatch(authRequest());
        try {
            const response = await axiosInstance.get("/auth");
            dispatch(userLoaded(response.data.user));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            localStorage.removeItem("token");
            dispatch(authError(messages.join(", ")));
            return false;
        }
    };
}

export function register(formData) {
    return async function (dispatch) {
        dispatch(authRequest());
        try {
            const response = await axiosInstance.post("/users", formData);

            const { token } = response.data;
            localStorage.setItem("token", token);
            dispatch(registerSuccess({ token }));
            await dispatch(loadUser());
            dispatch(setAlert("Registration successful", "success"));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            localStorage.removeItem("token");
            dispatch(authError(messages.join(", ")));
            return false;
        }
    };
}

export function login(formData) {
    return async function (dispatch) {
        dispatch(authRequest());
        try {
            const response = await axiosInstance.post("/auth", formData);

            const { token } = response.data;
            localStorage.setItem("token", token);
            dispatch(loginSuccess({ token }));
            await dispatch(loadUser());
            dispatch(setAlert("Login successful", "success"));
            return true;
        } catch (error) {
            const messages = extractErrorMessages(error);
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            localStorage.removeItem("token");
            dispatch(authError(messages.join(", ")));
            return false;
        }
    };
}
