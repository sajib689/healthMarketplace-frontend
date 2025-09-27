import ConsultationDetailsPage from '@/feature/consultation/ConsultationDetails';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Consultation Details',
}



const page = () => {
    return (
        <div>
            <ConsultationDetailsPage />
        </div>
    );
};

export default page;