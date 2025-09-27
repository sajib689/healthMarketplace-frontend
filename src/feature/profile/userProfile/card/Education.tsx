import Image from 'next/image';
import React from 'react';
import educationIMage from "@/assets/dynamic/Profile.png"

interface EducationProps {
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    description: string;
    imageSrc?: string;
    showImage?: boolean;
}


const Education: React.FC<EducationProps> = ({ institution, degree, startYear, endYear, description, imageSrc, showImage = true }) => {
    return (
        <div className=''>
            <p className='mb-1 text-lg font-medium'>{institution}</p>
            <p className='mb-1 text-gray-800/70 font-semibold'>{degree}</p>
            <p className=''>{startYear} - {endYear}</p>
            <p className='mt-4 text-gray-600'>{description}</p>
            {
                showImage && <Image src={educationIMage || imageSrc} alt='' width={200} height={200} className='max-w-[170px] max-h-[70px] w-full h-full mt-2' />
            }

            <div className="border-b-2 mt-2 border-black w-10"></div>
        </div>
    );
};

export default Education;
