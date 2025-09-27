import TalentProfile from '@/feature/profile/userProfile/TalentProfile';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Consultations Details',
}



const page = () => {
    return (
        <div>
            <TalentProfile />
        </div>
    );
};

export default page;