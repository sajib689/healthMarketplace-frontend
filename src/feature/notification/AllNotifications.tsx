"use client"
import NotificationIcon from '@/feature/notification/NotificationIcon';
import { useNotificationsQuery } from '@/redux/api/others/OthersApi';
import React from 'react';

const AllNotifications = () => {
    const { data } = useNotificationsQuery({})
    return (
        <div className="container section-gap">
            All Notifications
            <NotificationIcon notifications={data?.data} />
        </div>
    );
};

export default AllNotifications;