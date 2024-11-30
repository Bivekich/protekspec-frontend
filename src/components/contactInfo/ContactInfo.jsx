import { ContactBlock } from "./ContactBlock";
import { LegalBlock } from "./LegalBlock";
import { Container } from "../common/Container";
import { Link } from "react-router-dom";
import SectionTitle from "../aboutUs/SectionTitle";
import { motion } from "framer-motion";
import { useContactData } from "../../hooks/useContactData";
import { PageTitle } from "../PageTitle";

export function ContactInfo() {
  const { paymentData, contactData, loading, error } = useContactData();

  // Create contact data structure with fallback values
  const contactBlockData = {
    address: {
      label: "Адрес:",
      value: contactData?.Address || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c4ff665c2fb0bf714eecba53d0732f103ebedc3ce760dbe0d7bb44964826a0ce",
    },
    workHours: {
      label: "Время работы:",
      value: contactData?.WorkHours || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dac9291ca6fb8fc5eb4d90a98e3267b458a633b5b490638167b965d92cb61404",
    },
    email: {
      label: "Почта",
      value: contactData?.Email || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/22e3bd1ff2167beb3e05f48218872ab5cadff7fd4cc3d164d0a69d2e170398fb",
    },
    phone: {
      label: "Телефон",
      value: contactData?.Phone || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/94c47787bcc98144067748c48ea57016f95b80c351f5a1b5622cd959e103ada2",
    },
    whatsAppLink: contactData?.WhatsAppLink,
    telegramLink: contactData?.TelegramLink,
  };

  // Create legalData from fetched payment data with fallback values
  const legalData = {
    legalAddress: {
      label: "Юридический адрес:",
      value: paymentData?.LegalAddress || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aeddc4d2d9a0d6ac0d25d534692635538eb05cb3fb78f09245f498d866ceb49f",
    },
    companyName: {
      label: "Юридическое название:",
      value: paymentData?.LegalName || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/74778d7b30a57b4deb0784567d3fe25f6aa68c69f53db81b0e455917a3e50bb0",
    },
    inn: {
      label: "ИНН:",
      value: paymentData?.INN || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea63214aa8377e5f6f8e4993487ef2137e3fa712011a873030b3b992a8508142",
    },
    ogrn: {
      label: "ОГРН:",
      value: paymentData?.OGRN || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/74778d7b30a57b4deb0784567d3fe25f6aa68c69f53db81b0e455917a3e50bb0",
    },
    kpp: {
      label: "КПП:",
      value: paymentData?.KPP || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea63214aa8377e5f6f8e4993487ef2137e3fa712011a873030b3b992a8508142",
    },
  };

  if (loading) {
    return (
      <Container className="px-5 md:px-20">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-xl">Loading contact information...</div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="px-5 md:px-20">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </Container>
    );
  }

  return (
    <main className="bg-zinc-100 w-full pb-20">
      <Container className="px-5 md:px-20">
        <PageTitle title="Контакты" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col py-10"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6 text-md font-semibold"
          >
            <Link to="/" className="text-gray-500 hover:text-[#FAC612]">
              Главная
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-black">Контакты</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle
              title="Контакты"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
            />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row justify-between mt-10 gap-10 lg:gap-0">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <ContactBlock data={contactBlockData} />
                <div className="hidden lg:block w-[1px] h-auto bg-[#1A1A1A]" />
                <LegalBlock data={legalData} />
              </div>
            </motion.div>

            {/* Right Column - Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex-1 max-w-full lg:max-w-[600px] h-[350px]"
            >
              <iframe
                src={
                  contactData?.MapUrl ||
                  "https://yandex.ru/map-widget/v1/?um=constructor%3Abe4f7fa3a7abc5fbd66b83e2ee96f599e36449c6263a532d7d9391f89d3f42d3&amp;source=constructor"
                }
                width="100%"
                height="100%"
                frameBorder="0"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
