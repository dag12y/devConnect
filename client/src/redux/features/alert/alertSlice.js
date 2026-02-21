import { createSlice } from "@reduxjs/toolkit";

function createAlertSlice() {
    return createSlice({
        name: "alert",
        initialState: [],
        reducers: {
            clearAlerts: function () {
                return [];
            },
        },
    });
}

const alertSlice = createAlertSlice();

export const { clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
