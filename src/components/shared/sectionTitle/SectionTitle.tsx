import React from 'react';

const SectionTitle = ({ miniTitle, title, subtitle, white = false }: { miniTitle: string, title: string, subtitle: string, white?: boolean }) => {
    return (
        <div className="mb-12">
            <p className={`text-sm sm:text-lg mb-3 sm:mb-5 ${white ? "text-white/60" : "text-primary"}`}>{miniTitle}</p>
            <h2 className={`md:text-4xl sm:text-3xl text-3xl lg:text-6xl font-medium text-black mb-2 sm:mb-4 ${white ? "text-white" : "text-black"}`}>{title}</h2>
            <p className={` max-w-[600px] text-sm sm:text-lg ${white ? "text-white/60" : "text-gray-600"}`}>
                {subtitle}
            </p>
        </div>
    );
};

export default SectionTitle;