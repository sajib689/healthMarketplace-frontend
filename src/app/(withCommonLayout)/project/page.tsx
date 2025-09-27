import HeroHeader from '@/components/shared/header/Header';
import React from 'react';
import projectHeader from "@/assets/header/projectHeader.png"
import AllProjects from '@/feature/projects/AllProjects';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Projects',
}


const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/project" },
]


const page = () => {
    return (
        <div className='container'>
            <HeroHeader breadcrumbs={breadcrumbs} title='Projects' imageUrl={projectHeader.src} />
            <AllProjects />
        </div>
    );
};

export default page;