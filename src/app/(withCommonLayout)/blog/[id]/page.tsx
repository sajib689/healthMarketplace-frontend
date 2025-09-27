import BlogDetails from '@/feature/blogs/BlogDetails';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Details',
}



const page = () => {
    return (
        <div>
            <BlogDetails />
        </div>
    );
};

export default page;