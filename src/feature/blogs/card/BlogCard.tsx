import Image from "next/image";
import React from "react";
import { Blog } from "./types";
import Link from "next/link";

const BlogCard = ({ imageUrl, title, slug }: Blog) => {
  return (
    <Link href={`/blog/${slug}`} className="w-full ">
      <div className="w-full overflow-hidden">
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt=""
          className="w-full rounded-xl hover:scale-110 transition-all duration-300"
        />
      </div>
      <p className="text-lg font-semibold mt-4 leading-tight">{title}</p>
    </Link>
  );
};

export default BlogCard;
