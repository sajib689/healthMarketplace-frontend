import AppliedJobs from '@/feature/jobs/AppliedJobs';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Applied Jobs',
}


const page = () => {
    return (
        <div>
            <AppliedJobs />
        </div>
    );
};

export default page;