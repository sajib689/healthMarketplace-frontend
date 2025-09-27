import Faq from '@/components/Faq';
import React from 'react';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ',
}



const page = () => {
    return (
        <div className=''>
            <Faq />
        </div>
    );
};

export default page;