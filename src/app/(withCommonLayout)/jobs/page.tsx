import jobstHeader from "@/assets/header/jobHeader.png";
import HeroHeader from '@/components/shared/header/Header';
import AllJobs from '@/feature/jobs/AllJobs';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Jobs',
}


const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Job Listing", href: "/jobs" },
]


const page = () => {
    return (
        <div className='container'>
            <HeroHeader breadcrumbs={breadcrumbs} title='All Latest Jobs' imageUrl={jobstHeader.src} />
            <AllJobs />
        </div>
    );
};

export default page;