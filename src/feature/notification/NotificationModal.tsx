/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


interface Notification {
    notifications: any;
}

const NotificationModal = ({ notifications }: Notification) => {
    console.log(notifications);
    if (notifications.types === "delivery") {
        return <p>dd</p>
    }
};

export default NotificationModal;
