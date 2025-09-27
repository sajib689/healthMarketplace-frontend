import MyJobs from '@/feature/jobs/MyJobs';
import React from 'react';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Jobs',
}


const page = () => {
    return (
        <div>
            <MyJobs />
        </div>
    );
};

export default page;