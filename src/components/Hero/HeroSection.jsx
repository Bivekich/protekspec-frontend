import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { PageTitle } from "../PageTitle";

export const HeroSection = ({ title, backgroundImage }) => {
  return (
    <section className="flex overflow-hidden flex-col text-6xl font-bold text-center text-white uppercase bg-neutral-100 max-md:text-4xl">
      <PageTitle title="Главная" />
      <div className="flex relative flex-col items-center px-20 pt-48 pb-72 w-full min-h-[600px] max-md:px-5 max-md:py-24 max-md:max-w-full max-md:text-4xl">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          loading="lazy"
          src={backgroundImage}
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5, // Start after background image animation
          }}
          className="flex relative flex-col items-center mb-0 w-full max-w-[1700px] max-md:mb-2.5 max-md:max-w-full max-md:text-4xl"
        >
          <motion.h1
            className="w-full max-md:max-w-full max-md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1, // Stagger each word
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};
