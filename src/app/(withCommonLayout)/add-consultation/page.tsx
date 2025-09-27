import AddConsultation from '@/feature/consultation/AddConsultation';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Add Consultation',
}


const page = () => {
    return (
        <div>
            <AddConsultation />
        </div>
    );
};

export default page;