import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BrandLogos from "./BrandLogos";
import FeatureList from "./FeatureList";
import SectionTitle from "./SectionTitle";
import { Container } from "../common/Container";
import { getAboutUs } from "../../services/api";
import { PageTitle } from "../PageTitle";
import { getApiUrl } from "../../utils/env";

function AboutUs() {
  const ref = useRef(null);
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const formatBrands = (images) => {
    if (!images) return [];
    return images.map((image) => ({
      src: getApiUrl(image.url),
      alt: image.alternativeText || "",
      width: "100px",
      aspect: "3.24",
    }));
  };

  if (loading) return <div></div>;
  if (error || !aboutData) return <div>Error: {error}</div>;

  return (
    <div className="w-full bg-[#F5F5F5]">
      <PageTitle title="О нас" />
      <motion.main
        ref={ref}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="flex flex-col w-full py-10"
      >
        <Container className="px-5 md:px-20">
          <div className="flex items-center gap-2 mb-6 text-md font-semibold">
            <Link to="/" className="text-gray-500 hover:text-[#FAC612]">
              Главная
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-black">О компании</span>
          </div>

          <motion.div variants={item}>
            <SectionTitle
              iconSrc={getApiUrl(aboutData.titleIcon.url)}
              title={aboutData.title}
            />
          </motion.div>

          <section className="flex flex-wrap gap-10 mt-10 w-full max-md:mt-10">
            <motion.article
              variants={item}
              className="flex flex-col flex-1 min-w-[240px]"
            >
              <motion.div
                variants={item}
                className="flex flex-col w-full max-md:max-w-full"
              >
                <FeatureList text={aboutData.description} />
                <FeatureList text={aboutData.mainBrandsTitle} />
                <motion.div
                  variants={item}
                  className="opacity-0"
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <BrandLogos brands={formatBrands(aboutData.mainBrands)} />
                </motion.div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex flex-col mt-5 w-full max-md:max-w-full"
              >
                <FeatureList text={aboutData.additionalBrandsTitle} />
                <motion.div
                  variants={item}
                  className="opacity-0"
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <BrandLogos
                    brands={formatBrands(aboutData.additionalBrands)}
                  />
                </motion.div>
              </motion.div>

              <motion.hr variants={item} className="mt-5 border-[#DADADA]" />
            </motion.article>
          </section>
        </Container>
      </motion.main>
    </div>
  );
}

export default AboutUs;
