import ProjectDelivery from '@/feature/projects/ProjectDelivery';
import React from 'react';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Delivery',
}


const page = () => {
    return (
        <div className='container'>
            <ProjectDelivery />
        </div>
    );
};

export default page;