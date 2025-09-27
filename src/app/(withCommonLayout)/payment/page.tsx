import PaymentPage from '@/feature/payment/paymentPage';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Payment',
}


const page = () => {
    return (
        <div>
            <PaymentPage />
        </div>
    );
};

export default page;