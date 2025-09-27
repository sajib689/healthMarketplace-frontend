



"use client";
import { useGetAllBlogsQuery } from '@/redux/api/blog/blogApi';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Blog } from "@/interfaces/global";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  slug: string;
}

const BlogsSlider = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  // Fetch only 3 blog posts
  const { data, isLoading, isError, error } = useGetAllBlogsQuery({ page: 1, limit: 3 });

  // Map and sort API data to BlogPost interface, limit to 3 items, newest first
  const blogPosts: BlogPost[] = (data?.data ?? [])
    .sort((a: Blog, b: Blog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by createdAt desc
    .slice(0, 3)
    .map((post: Blog) => ({
      id: post.id,
      title: post.title,
      date: post.createdAt
        ? new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
      image: post.image,
      slug: post.slug,
    }));

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="section-gap text-center">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="section-gap text-center text-red-500">
        <p>Failed to load blogs: {error?.toString() || "Unknown error"}</p>
      </div>
    );
  }

  if (!blogPosts.length) {
    return (
      <div className="section-gap text-center">
        <p>No blogs available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeIn" }}
      className="section-gap"
    >
      <div className="xl:grid lg:grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
        <div className="xl:col-span-2">
          <Swiper
            direction={"vertical"}
            className="mySwiper w-full xl:max-h-[640px] lg:max-h-[450px] md:max-h-[500px] max-h-[400px]"
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
              stopOnLastSlide: false,
            }}
            loop={blogPosts.length > 1}
            onSlideChange={(swiper) => setCurrentImage(swiper.realIndex)}
          >
            {blogPosts.map((post, index) => (
              <SwiperSlide key={index} className="rounded-lg group">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={1200}
                    height={900}
                    className="object-cover group-hover:scale-110 transition-all duration-300 w-full xl:min-h-[640px] lg:min-h-[450px] md:min-h-[500px] h-[400px] rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 rounded-lg" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 space-y-2">
                    <time className="text-sm text-gray-200 font-medium">{post.date}</time>
                    <h2 className="text-2xl lg:text-2xl xl:text-4xl font-bold text-white max-w-2xl">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="xl:max-w-2xl xl:mx-auto xl:space-y-8 lg:flex-col md:flex hidden">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex group items-center justify-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors ${
                currentImage === index ? "bg-gray-100" : ""
              }`}
            >
              <div className="relative xl:w-40 lg:w-28 w-20 h-20 lg:h-28 xl:h-40 flex-shrink-0 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="rounded-lg object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="xl:text-xl lg:text-base text-sm font-semibold text-gray-900 mb-1">
                  {post.title}
                </h3>
                <time className="text-sm text-gray-500">{post.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogsSlider;