"use client"

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { motion } from 'framer-motion';
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import "swiper/css"; // Import base styles
import "swiper/css/autoplay"; // Import autoplay styles
import "swiper/css/pagination";
import BlogsSlider from "./BlogsSlider";
// Import Swiper modules



const HomeBlogsSlider = () => {
    const router = useRouter()
    return (

        <motion.div
            initial={{ opacity: 0 }} // Start slightly below
            animate
            whileInView={{ opacity: 1 }} // Animate when in viewport
            viewport={{ once: true, amount: 0.2, }} // Trigger once when 20% visible
            transition={{ duration: 0.7, ease: "easeIn" }}
            className="container section-gap">
            <div className="flex items-center justify-between">
                <SectionTitle
                    miniTitle="Blog"
                    subtitle="Stay updated with expert advice, industry trends, and success stories to grow your career and business."
                    title="Latest Blog and Articles"
                />
                <PrimaryButton onClick={() => router.push("/blogs")}>
                    <div className="flex items-center justify-center gap-3 text-nowrap">
                        <p>See More</p>
                        <MoveUpRight className="w-4" />
                    </div>
                </PrimaryButton>
            </div>
            <BlogsSlider />
        </motion.div>
    )
}

export default HomeBlogsSlider

