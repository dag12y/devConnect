import { addAlert, removeAlert } from "./alertSlice";

export function setAlert(msg, alertType = "info", timeout = 5000) {
    return function (dispatch) {
        const action = addAlert(msg, alertType);
        dispatch(action);

        const { id } = action.payload;
        setTimeout(function () {
            dispatch(removeAlert(id));
        }, timeout);
    };
}

export { removeAlert };
