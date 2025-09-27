import AddProjects from '@/feature/projects/AddProjects';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Add Projects',
}

const page = () => {
    return (
        <div>
            <AddProjects />
        </div>
    );
};

export default page;