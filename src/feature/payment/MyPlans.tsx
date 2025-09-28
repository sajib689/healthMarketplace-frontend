"use client"

import PaymentCard from '@/components/paymenCard/PaymentCard';
import { useCreateSubscriptionCheckoutMutation, useGetSubscriptionPlansQuery } from '@/redux/api/payment/paymentApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const MyPlans = () => {
    const { data, isLoading, error } = useGetSubscriptionPlansQuery();
    const router = useRouter()
    const [createPayment, { isLoading: doingPayment }] = useCreateSubscriptionCheckoutMutation()
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const handleSelectPlan = async (plan: string) => {
        setLoadingId(plan)
        console.log('Selected plan:', plan);
        const payload = { planId: plan }
        const res = await createPayment(payload)
        if (res.data?.success) {
            setLoadingId(null)
            router.push(res.data.data.url.url)
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading subscription plans...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <p className="text-red-600">Error loading subscription plans. Please try again later.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!data?.data || data.data.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <p className="text-gray-600">No subscription plans available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 py-16'>
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Choose Your Perfect Plan
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Select the subscription plan that best fits your company&apos;s needs.
                    Upgrade or downgrade at any time.
                </p>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {data.data.map((plan) => (
                    <PaymentCard
                        key={plan.id}
                        plan={plan}
                        isPopular={plan.name === 'Standard Plan'} // You can customize this logic
                        onSelectPlan={handleSelectPlan}
                        doingPayment={doingPayment}
                        loadingId={loadingId}
                    />
                ))}
            </div>

            {/* FAQ Section
            <div className="mt-20 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
                        <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What happens if I exceed my job post limit?</h3>
                        <p className="text-gray-600">You&apos;ll need to upgrade your plan or wait until the next billing cycle to post more jobs.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                        <p className="text-gray-600">We offer a 30-day money-back guarantee for all new subscriptions.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
                        <p className="text-gray-600">No, there are no setup fees or hidden charges. You only pay the monthly subscription fee.</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MyPlans;