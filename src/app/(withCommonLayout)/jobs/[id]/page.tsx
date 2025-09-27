import JobDetails from '@/feature/jobs/JobDetails';
import React from 'react';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Job Details',
}



const page = () => {
    return (
        <div>
            <JobDetails />
        </div>
    );
};

export default page;