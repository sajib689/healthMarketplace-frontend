import { Loader, Star } from 'lucide-react';
import React from 'react';

type Plan = {
    id: string
    name: string;
    description: string;
    price: number;
    duration: string;
    limitedJobPosts: number;

};

type PaymentCardProps = {
    plan: Plan;
    isPopular?: boolean;
    onSelectPlan: (plan: string) => void;
    doingPayment: boolean
    loadingId: string | null
};

const PaymentCard: React.FC<PaymentCardProps> = ({ plan, isPopular = false, onSelectPlan, doingPayment, loadingId }) => {
    // Parse HTML description to plain text (simple approach)
    const getPlainTextDescription = (html: string): string => {
        return html.replace(/<[^>]*>/g, '');
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };




    return (
        <div
            className={`relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${isPopular
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105'
                : 'border border-gray-200 bg-white hover:border-gray-300'
                }`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        <Star className="w-4 h-4 fill-current" />
                        Most Popular
                    </div>
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{getPlainTextDescription(plan.description)}</p>

                <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{formatPrice(plan.price)}</span>
                    <span className="text-gray-500">/{plan.duration}</span>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{
                __html: plan?.description
            }}>

            </div>

            <button
                disabled={doingPayment}
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${isPopular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
            >
                <div className={`flex items-center justify-center gap-2`}>
                    <Loader
                        className={`${loadingId === plan.id ? "opacity-100" : "opacity-0"
                            } animate-spin text-center absolute`}
                    />
                    <span className={`${loadingId === plan.id ? "opacity-0" : "opacity-100"}`}>
                        Choose {plan.name}
                    </span>
                </div>

            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
                Cancel anytime. No hidden fees.
            </p>
        </div>
    );
};

export default PaymentCard;
