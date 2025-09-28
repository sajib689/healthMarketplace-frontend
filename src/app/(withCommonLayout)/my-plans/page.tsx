import React from 'react';

import { Metadata } from "next";
import MyPlans from '@/feature/payment/MyPlans';

export const metadata: Metadata = {
    title: "My Plans",
};


const page = () => {
    return (
        <div>
            <MyPlans />
        </div>
    );
};

export default page;