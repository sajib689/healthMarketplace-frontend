import SuccessPage from '@/components/SuccessPagee';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Success ",
};


const page = () => {
    return (
        <SuccessPage />
    );
};

export default page;