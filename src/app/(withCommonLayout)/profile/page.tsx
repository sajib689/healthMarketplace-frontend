import ProfilePage from '@/feature/profile/userProfile/profilePage';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Profile',
}


const page = () => {
    return (
        <div>
            <ProfilePage />
        </div>
    );
};

export default page;