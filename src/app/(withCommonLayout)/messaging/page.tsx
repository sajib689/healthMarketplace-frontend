import MessagesPage from '@/feature/messages/support/Support';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Messages',
}


const page = () => {
    return (
        <div>
            <MessagesPage />
        </div>
    );
};

export default page;