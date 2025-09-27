"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from './shared/sectionTitle/SectionTitle';
import Image from 'next/image';
import { motion } from 'framer-motion';


interface TestimonialCardProps {
    quote: string
    author: string
    company: string
    imageSrc: string
}


const testimonials = [
    {
        quote:
            "This service completely transformed our workflow! From scheduling tasks to streamlining communication, everything has become more efficient. Highly recommend to anyone looking for a solution that prioritizes productivity and ease of use.",
        author: "John Doe",
        company: "Tech Innovations",
        imageSrc: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost",
    },
    {
        quote:
            "The support team is outstanding, and the product exceeded all our expectations. Every query we raised was handled promptly, and the results have been nothing short of transformative. A game-changer for us, and I can't recommend it enough!",
        author: "Jane Smith",
        company: "Creative Solutions",
        imageSrc: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost",
    },
    {
        quote:
            "Seamless integration and exceptional performance. Our systems had never worked together so smoothly before using this product. It’s rare to find such a reliable solution these days, and we’re thrilled with the results.",
        author: "Michael Johnson",
        company: "Future Enterprises",
        imageSrc: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost",
    },
    {
        quote:
            "Our team productivity has skyrocketed since we adopted this tool. From managing multiple projects to ensuring deadlines are met, this tool has been a lifesaver. We couldn’t be happier with the results!",
        author: "Emily Davis",
        company: "Bright Ideas Co.",
        imageSrc: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost",
    },
    {
        quote:
            "A truly remarkable experience from start to finish. The customer support was attentive, the features are innovative, and the results exceeded our expectations. Customer satisfaction at its finest, and we will definitely continue using this service.",
        author: "David Wilson",
        company: "NextGen Labs",
        imageSrc: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost",
    },
    {
        quote:
            "Magura Property Management has transformed how I manage my rentals. Their professional team handles everything from tenant communication to property maintenance, ensuring that I can focus on other priorities. Since partnering with them, my rental income has never been higher. ",
        author: "Anonymous",
        company: "Magura Property Management",
        imageSrc: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost",
    },
];



const Testimonials = () => {
    SwiperCore.use([Autoplay])

    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)

    return (
        <motion.div
            initial={{ opacity: 0 }} // Start slightly below
            animate
            whileInView={{ opacity: 1 }} // Animate when in viewport
            viewport={{ once: true, amount: 0.4, }} // Trigger once when 20% visible
            transition={{ duration: 0.4, ease: "easeIn" }} className=' bg-primary'>
            <div className="container section-gap">
                <div className=' !text-white'>
                    <SectionTitle white miniTitle='Testimonials' subtitle='Hear from our satisfied clients and discover how we’ve helped them achieve their career goals and success' title='What Our Clients Say' />
                </div>
                <div className="relative">
                    <Swiper
                        className="mySwiper"
                        slidesPerView={1}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                            stopOnLastSlide: false,
                        }}
                        loop={true}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                    >
                        {testimonials?.map((data, idx) => (
                            <SwiperSlide key={idx}>
                                <TestimonialCard
                                    author={data.author}
                                    company={data.company}
                                    imageSrc={data.imageSrc}
                                    quote={data.quote}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className='container relative '>
                        <div className='absolute -top-8 right-16 z-20'>
                            {/* Left (Previous) button */}
                            <button className={` p-2 bg-white/10 rounded-full border`}
                                onClick={() => swiperInstance?.slidePrev()}>
                                <ChevronLeft className='fill-transparent text-white relative ' />
                            </button>
                        </div>

                        <div className='absolute -top-8 right-0 z-20'>
                            {/* Right (Next) button */}
                            <button className={`$ p-2 bg-white/10 rounded-full border`}
                                onClick={() => swiperInstance?.slideNext()}>
                                <ChevronRight className='fill-transparent text-white relative ' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Testimonials;



export function TestimonialCard({
    quote,
    author,
    company,
    imageSrc,
}: TestimonialCardProps) {
    return (
        <div className="">
            {/* Content container */}
            <div className="relative flex flex-1 flex-col justify-between">
                <blockquote className="mb-4 sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white mt-6 font-cardillac max-w-7xl">
                    {quote}
                </blockquote>
            </div>
            {/* Image container with fixed aspect ratio */}
            <div className="relative h-[200px] max-w-[250px] w-full overflow-hidden rounded-lg md:h-[240px] md:w-[200px] lg:h-[300px] lg:w-[300px] mt-6">
                <Image
                    src={imageSrc}
                    alt={`image of ${author}`}
                    width={200}
                    height={200}
                    className="object-contain w-14 h-14 rounded-full"
                />
                <div className='mt-4'>
                    <p className="text-md font-medium text-white">
                        {author}
                    </p>
                    <p className="mt-1 text-sm text-white/80">{company}</p>
                </div>
            </div>
        </div>
    )
}

