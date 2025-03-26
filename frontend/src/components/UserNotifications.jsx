import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotifications } from '../redux/notificationSlice';

const UserNotifications = () => {
    const dispatch = useDispatch();
    const { notifications } = useSelector(store => store.notifications) || {};

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/notifications'); // Replace with your API endpoint
                const data = await response.json();
                dispatch(setNotifications(data)); // Store in Redux
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();
    }, [dispatch]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            {notifications?.length > 0 ? (
                <ul className="space-y-2">
                    {notifications.map((notification, index) => (
                        <li key={index} className="p-2 border rounded bg-gray-100">
                            {notification.message || "No message available"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No new notifications.</p>
            )}
        </div>
    );
};

export default UserNotifications;
