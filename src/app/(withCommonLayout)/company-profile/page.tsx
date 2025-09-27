import CompanyProfilePage from '@/feature/profile/companyProfile/CompanyProfile';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Company',
}


const page = () => {
    return (
        <div>
            <CompanyProfilePage />
        </div>
    );
};

export default page;