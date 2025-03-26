import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const { setNotifications, addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
