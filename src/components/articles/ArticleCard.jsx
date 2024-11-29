import * as React from "react";
import { motion } from "framer-motion";

export function ArticleCard({ imageUrl, title, date }) {
  return (
    <motion.article 
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col flex-1 min-w-[240px] max-w-[300px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <img
        loading="lazy"
        src={imageUrl}
        alt={title}
        className="object-cover w-full aspect-[1.5] rounded-md"
      />
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-xl font-medium text-[#333]">
          {title}
        </h3>
        <time className="text-sm text-[#666]">
          {date}
        </time>
      </div>
    </motion.article>
  );
}

export default ArticleCard;