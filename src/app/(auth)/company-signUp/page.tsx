import CompanySignUp from '@/feature/auth/CompanySignUp';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up',
}


const page = () => {
    return (
        <div>
            <CompanySignUp />
        </div>
    );
};

export default page;