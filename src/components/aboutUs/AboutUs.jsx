import { useEffect, useState } from "react";
import BrandLogos from "./BrandLogos";
import FeatureList from "./FeatureList";
import SectionTitle from "./SectionTitle";
import { Container } from "../common/Container";
import { motion } from "framer-motion";
import { getAboutUs } from "../../services/api";

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await getAboutUs();
        if (response?.data?.[0]) {
          setAboutData(response.data[0]);
        } else {
          setError("No about data found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  const formatBrands = (images) => {
    if (!images) return [];
    return images.map((image) => ({
      src: `${import.meta.env.VITE_API_URL}${image.url}`,
      alt: image.alternativeText || "",
      width: "100px",
      aspect: "3.24",
    }));
  };

  if (loading) return <div></div>;
  if (error || !aboutData) return <div>Error: {error}</div>;

  const featuresList = [
    aboutData.features.feature1,
    aboutData.features.feature2,
    aboutData.features.feature3,
    aboutData.features.feature4,
  ].filter(Boolean);

  return (
    <main className="flex flex-col w-full bg-[#F5F5F5] -mt-[250px]">
      <div className="h-[300px]" />
      <Container className="px-5 md:px-20 py-10">
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.div variants={item}>
            <SectionTitle
              iconSrc={`${import.meta.env.VITE_API_URL}${
                aboutData.titleIcon.url
              }`}
              title={aboutData.title}
            />
          </motion.div>

          <section className="flex flex-wrap gap-10 mt-10 w-full">
            <motion.article
              variants={item}
              className="flex flex-col flex-1 min-w-[240px] lg:max-w-[60%]"
            >
              <div className="flex flex-col w-full">
                <FeatureList text={aboutData.description} />
                <FeatureList text={aboutData.mainBrandsTitle} />
                <div className="overflow-x-auto -mx-5 px-5 md:overflow-visible md:px-0">
                  <BrandLogos brands={formatBrands(aboutData.mainBrands)} />
                </div>
              </div>

              <div className="flex flex-col mt-5 w-full">
                <FeatureList text={aboutData.additionalBrandsTitle} />
                <div className="overflow-x-auto -mx-5 px-5 md:overflow-visible md:px-0">
                  <BrandLogos
                    brands={formatBrands(aboutData.additionalBrands)}
                  />
                </div>
              </div>

              <hr className="mt-5 border-[#DADADA]" />

              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#333]">
                {aboutData.featuresTitle}
              </h2>

              <div className="flex flex-col mt-5 w-full">
                {featuresList.map((feature, index) => (
                  <FeatureList key={index} text={feature} />
                ))}
              </div>
            </motion.article>

            <motion.div variants={item} className="flex-1 min-w-[240px]">
              {aboutData.bigImage && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    aboutData.bigImage.url
                  }`}
                  alt={aboutData.bigImage.alternativeText || "Tractor image"}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </motion.div>
          </section>
        </motion.div>
      </Container>
    </main>
  );
}

export default AboutUs;
