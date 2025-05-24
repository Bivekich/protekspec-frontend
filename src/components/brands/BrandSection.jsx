import { useState, useEffect } from "react";
import { getBrands } from "../../services/api";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/env";

export function BrandSection() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getImageUrl = (brand) => {
    try {
      const logo = brand.logo;
      if (!logo) return null;

      const imageUrl = logo.url;
      if (imageUrl?.startsWith("/")) {
        return getApiUrl(imageUrl);
      }
      return imageUrl;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        setBrands(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleViewAllClick = () => {
    navigate("/brands");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Container className="px-5 md:px-20 py-16 ">
        <div className="flex justify-center items-center h-[200px] ">
          <div className="text-xl">Loading brands...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="px-5 md:px-20 py-16 relative z-10 ">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex gap-2.5 items-center mb-16 "
      >
        <motion.img
          transition={{ duration: 0.8 }}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-[0.59] fill-[#FAC612] w-[35px] md:w-[46px]"
        />
        <h1 className="text-4xl md:text-5xl font-bold uppercase text-[#333]">
          Бренды
        </h1>
      </motion.header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 ">
        {brands.map((brand) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-3 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
          >
            {brand.website ? (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={getImageUrl(brand)}
                  alt="Brand logo"
                  className="w-full h-auto object-contain transition-all duration-200 filter grayscale hover:grayscale-0"
                />
              </a>
            ) : (
              <img
                src={getImageUrl(brand)}
                alt="Brand logo"
                className="w-full h-auto object-contain transition-all duration-200 filter grayscale hover:grayscale-0"
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mt-16"
      >
        <button
          onClick={handleViewAllClick}
          className="px-16 py-4 text-base font-bold uppercase rounded-md bg-[#FAC612] hover:bg-[#FAC612]/80 active:bg-[#FAC612]/90 transition-all duration-200"
        >
          Все бренды
        </button>
      </motion.div>
    </Container>
  );
}

export default BrandSection;
