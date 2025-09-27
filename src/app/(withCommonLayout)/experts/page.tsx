import consultationHeader from "@/assets/header/talentHeader.png";
import HeroHeader from '@/components/shared/header/Header';
import AllConsultation from '@/feature/consultation/AllConsultation';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Consultations',
}


const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Experts", href: "/consultation" },
]


const page = () => {
    return (
        <div className='container'>
            <HeroHeader breadcrumbs={breadcrumbs} title='Explore Marketplace Talent' imageUrl={consultationHeader.src} />
            <AllConsultation />
        </div>
    );
};

export default page;