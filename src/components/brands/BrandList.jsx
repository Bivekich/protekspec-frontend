import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../common/Container";
import SectionTitle from "../aboutUs/SectionTitle";
import { getBrands } from "../../services/api";
import { PageTitle } from "../PageTitle";
import { getApiUrl } from "../../utils/env";

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

export function BrandList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <Container className="px-5 md:px-20 py-16">
        <div className="flex justify-center items-center h-[200px]">
          <div className="text-xl">Loading brands...</div>
        </div>
      </Container>
    );
  }

  return (
    <main className="bg-zinc-100 w-full pb-20">
      <motion.main
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-full relative overflow-hidden pb-[100px]"
      >
        <PageTitle title="Бренды" />
        <Container className="px-5 md:px-20 pt-5">
          {/* Breadcrumbs */}
          <nav className="text-sm md:text-md flex gap-2 items-center py-4 font-semibold mb-8">
            <Link
              to="/"
              className="text-gray-500 hover:text-[#FAC612] transition-colors"
            >
              Главная
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-black">Бренды</span>
          </nav>

          <SectionTitle
            title="БРЕНДЫ"
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
          />

          {/* Brand Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, delay: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 w-full mt-10"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex items-center justify-center p-1 hover:bg-white hover:shadow-lg hover:border-[#FAC612] transition-all duration-200 aspect-[21/9] group cursor-pointer"
              >
                {brand.website ? (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={getImageUrl(brand)}
                      alt="Brand logo"
                      className="w-full h-full object-contain transition-all duration-200 filter grayscale group-hover:grayscale-0 group-hover:brightness-110"
                      style={{ maxWidth: "100%", maxHeight: "75%" }}
                    />
                  </a>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={getImageUrl(brand)}
                      alt="Brand logo"
                      className="w-full h-full object-contain transition-all duration-200 filter grayscale group-hover:grayscale-0 group-hover:brightness-110"
                      style={{ maxWidth: "100%", maxHeight: "75%" }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.section>
        </Container>
      </motion.main>
    </main>
  );
}

export default BrandList;
