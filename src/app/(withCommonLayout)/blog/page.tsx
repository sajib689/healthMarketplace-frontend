import AllBlogs from "@/feature/blogs/AllBlogs";
import React from "react";
import blogHeader from "@/assets/header/blogHeader.png";
import HeroHeader from "@/components/shared/header/Header";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

const page = () => {
  return (
    <div className="container">
      <HeroHeader
        breadcrumbs={breadcrumbs}
        title="Blogs"
        imageUrl={blogHeader.src}
      />
      <AllBlogs />
    </div>
  );
};

export default page;
