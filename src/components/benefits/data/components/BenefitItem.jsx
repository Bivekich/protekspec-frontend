import * as React from "react";
import { motion } from "framer-motion";

export function BenefitItem({ icon, title, items, deliveryTypes, className }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col px-4 py-5 min-h-[300px] border-b border-r last:border-r-0 even:border-r-0 lg:even:border-r lg:border-b-0 last:border-b-0 xl:[&:not(:first-child)]:border-l border-[#DADADA] ${className || ''}`}
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        loading="lazy"
        src={icon}
        alt={`${title} icon`}
        className="object-contain self-center aspect-square w-[60px] md:w-[78px]"
      />
      <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-black text-center text-[#333333]">
        {title}
      </h2>
      {items && (
        <ul className="flex flex-col mt-4 w-full text-sm md:text-base text-[#1A1A1A]">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2.5 items-center mt-1.5 first:mt-0 w-full">
              <span className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-yellow-400 rounded-full" />
              <p className="flex-1">{item}</p>
            </li>
          ))}
        </ul>
      )}
      {deliveryTypes && (
        <div className="flex flex-col justify-center mt-4 w-full text-sm md:text-base text-[#1A1A1A]">
          <p className="text-black">Своя логистика:</p>
          {deliveryTypes.map((type, index) => (
            <div key={index} className="flex gap-2.5 items-center mt-1.5 w-full">
              <img
                loading="lazy"
                src={type.icon}
                alt={`${type.text} icon`}
                className="object-contain w-8 md:w-10 aspect-[1.82]"
              />
              <p className="self-stretch my-auto">{type.text}</p>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}