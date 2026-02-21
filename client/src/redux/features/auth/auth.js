import axiosInstance, { extractErrorMessages } from "../../../utils/axiosInstance";
import { setAlert } from "../alert/alert";
import { authRequest, registerSuccess, authError } from "./authSlice";

export function register(formData) {
    return async function (dispatch) {
        dispatch(authRequest());
        try {
            const response = await axiosInstance.post("/users", formData);

            const { token } = response.data;
            localStorage.setItem("token", token);
            dispatch(registerSuccess({ token }));
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
