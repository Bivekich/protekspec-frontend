import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSliderImages } from "../services/api";
import { useRef } from "react";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
    zIndex: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    zIndex: 0,
  }),
};

const CircularButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex justify-center items-center w-14 h-14 rounded-full hover:bg-white/70 border border-[#FAC612] border-2 transition-colors focus:outline-none"
  >
    {children}
  </button>
);

export function ImageSliderSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const data = await getSliderImages();
        console.log("Slider data:", data);

        if (data.data) {
          const formattedImages = data.data.reduce((acc, item) => {
            console.log("Processing item:", item);
            if (!item.slider) {
              console.warn("Missing slider data for item:", item);
              return acc;
            }

            const imageSet = item.slider.map((image) => ({
              src: `${import.meta.env.VITE_API_URL}${image.url}`,
              alt: image.alternativeText || "Slider image",
            }));
            return [...acc, ...imageSet];
          }, []);

          setImages(formattedImages);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching slider images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  const imageIndex = Math.abs(page % (images.length || 1));

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  if (loading) {
    return (
      <div className="w-full bg-[#F5F5F5] h-[500px] flex items-center justify-center">
        <div className="text-xl">Loading slider...</div>
      </div>
    );
  }

  if (error || !images.length) {
    return (
      <div className="w-full bg-[#F5F5F5] h-[500px] flex items-center justify-center">
        <div className="text-xl text-red-500">
          {error || "No images available"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F5] overflow-x-hidden pb-20">
      <motion.main
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col w-full pb-[100px]"
      >
        <div className="flex flex-col items-center mt-10">
          <section className="flex flex-col items-end self-stretch px-20 w-full max-md:px-5">
            <div className="flex gap-2.5 items-start">
              <CircularButton onClick={() => paginate(-1)}>
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAC612"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </CircularButton>
              <CircularButton onClick={() => paginate(1)}>
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAC612"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </CircularButton>
            </div>
          </section>

          <div className="relative w-full lg:w-[130%] h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mt-5">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="absolute w-full h-full flex justify-center gap-4 items-center"
              >
                <div className="hidden md:flex w-full h-full justify-center gap-4 items-center">
                  <img
                    src={
                      images[(imageIndex - 1 + images.length) % images.length]
                        .src
                    }
                    alt="Previous"
                    className="w-1/4 h-[470px] object-cover rounded-md"
                  />
                  <img
                    src={images[imageIndex].src}
                    alt={images[imageIndex].alt}
                    className="w-1/2 h-[600px] object-cover rounded-md"
                  />
                  <img
                    src={images[(imageIndex + 1) % images.length].src}
                    alt="Next"
                    className="w-1/4 h-[470px] object-cover rounded-md"
                  />
                </div>

                <div className="md:hidden w-full h-full px-5">
                  <img
                    src={images[imageIndex].src}
                    alt={images[imageIndex].alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors focus:outline-none ${
                  index === imageIndex ? "bg-[#FAC612]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
