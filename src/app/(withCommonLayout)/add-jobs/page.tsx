import AddJobs from '@/feature/jobs/AddJobs';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Add Jobs',
}

const page = () => {
    return (
        <div>
            <AddJobs />
        </div>
    );
};

export default page;