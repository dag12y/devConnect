import axiosInstance, { extractErrorMessages } from "../../../utils/axiosInstance";
import { setAlert } from "../alert/alert";
import { profileRequest, profileLoaded, profileError } from "./profileSlice";

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
            messages.forEach(function (msg) {
                dispatch(setAlert(msg, "error"));
            });
            dispatch(profileError(messages.join(", ")));
            return false;
        }
    };
}
