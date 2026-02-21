import { createSlice, nanoid } from "@reduxjs/toolkit";

function createAlertSlice() {
    return createSlice({
        name: "alert",
        initialState: [],
        reducers: {
            addAlert: {
                reducer: function (state, action) {
                    state.push(action.payload);
                },
                prepare: function (msg, alertType = "info") {
                    return {
                        payload: {
                            id: nanoid(),
                            msg,
                            alertType,
                        },
                    };
                },
            },
            removeAlert: function (state, action) {
                return state.filter(function (alert) {
                    return alert.id !== action.payload;
                });
            },
            clearAlerts: function () {
                return [];
            },
        },
    });
}

const alertSlice = createAlertSlice();

export const { addAlert, removeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
