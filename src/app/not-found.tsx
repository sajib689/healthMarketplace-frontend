import React from 'react';


import { Metadata } from 'next';
import PageNotFound from '@/components/shared/notFoundPage/404Page';

export const metadata: Metadata = {
    title: 'Page Not Found',
}


const page = () => {
    return (
        <div>
            <PageNotFound />
        </div>
    );
};

export default page;