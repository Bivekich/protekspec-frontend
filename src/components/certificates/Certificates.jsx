import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "../common/Container";
import SectionTitle from "../aboutUs/SectionTitle";
import { getCertificates } from "../../services/api";
import { getApiUrl } from "../../utils/env";

export function CertificatesSection() {
  const ref = useRef(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await getCertificates();
        console.log("Raw certificate data:", response);

        if (response?.data) {
          const formattedCertificates = response.data.flatMap((cert) => {
            if (!cert.image) return [];

            return cert.image.map((image) => ({
              id: image.id,
              src: getApiUrl(image.url),
              alt: image.alternativeText || "Certificate image",
            }));
          });

          setCertificates(formattedCertificates);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching certificates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="w-full bg-[#F5F5F5]">
        <Container className="px-5 md:px-20 py-10">
          <div className="flex justify-center items-center h-[400px]">
            <div className="text-xl">Loading certificates...</div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !certificates.length) {
    return (
      <div className="w-full bg-[#F5F5F5]">
        <Container className="px-5 md:px-20 py-10">
          <div className="flex justify-center items-center h-[400px]">
            <div className="text-xl text-red-500">
              {error || "No certificates available"}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F5]">
      <motion.main
        ref={ref}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="flex flex-col w-full pb-[200px]"
      >
        <Container className="px-5 md:px-20 py-10">
          <motion.div variants={item}>
            <SectionTitle
              iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
              title="Сертификаты"
            />
          </motion.div>

          <motion.section
            className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-5 mt-10 justify-items-center"
            role="region"
            aria-label="Image gallery"
          >
            {certificates.map((certificate) => (
              <motion.img
                key={certificate.id}
                variants={item}
                src={certificate.src}
                alt={certificate.alt}
                className="w-full max-w-[250px] rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            ))}
          </motion.section>
        </Container>
      </motion.main>
    </div>
  );
}

export default CertificatesSection;
