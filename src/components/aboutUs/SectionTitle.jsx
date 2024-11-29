import { motion } from "framer-motion";

function SectionTitle({ iconSrc, title }) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2.5 items-center w-full text-5xl font-bold uppercase text-[#333333] max-md:max-w-full max-md:text-4xl"
    >
      <motion.img
        transition={{ duration: 0.8 }}
        loading="lazy"
        src={iconSrc}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto aspect-[0.59] fill-[#FAC612] w-[46px]"
      />
      <motion.h1 className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full max-md:text-4xl">
        {title}
      </motion.h1>
    </motion.header>
  );
}

export default SectionTitle;
