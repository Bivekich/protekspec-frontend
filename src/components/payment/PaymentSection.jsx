import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../common/Container";
import SectionTitle from "../aboutUs/SectionTitle";
import { getPaymentAndDelivery } from "../../services/api";
import { PageTitle } from "../PageTitle";
const paymentPoints = [
  "Работаем с Юр. лицами с НДС",
  "В индивидуальных случаях возможна работа с ИП и оплата наличными",
  "Работаем с предоплатой и без",
  "Оплата производится только по безналичному расчету. Покупатель перечисляет денежные средства на наш расчетный счет, согласно выставленному счету",
];

const deliveryCompanies = [
  {
    Logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/1cad568ee80eb756efe5ab73710a7c935ad9203db09f076a41706344b37c82e4",
    Name: "СДЭК",
    TrackingLink: "https://www.cdek.ru/ru/tracking/",
  },
  {
    Logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/4b3a0fbad79802c488fa98f178f846b5fbe2eceb287713e36adad8494a92900c",
    Name: "Деловые линии",
    TrackingLink: "https://www.dellin.ru/tracker/",
  },
  {
    Logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/f52f5ff70b5cdcf1c4d38a02196ce1eea065b17afb2fca3a4e702017809ec03d",
    Name: "Почта России",
    TrackingLink: "https://www.pochta.ru/tracking/",
  },
];

const deliveryPoints = [
  "Самовывоз",
  "Имеется своя доставка по Москве и Московской области",
  "Так же предлагаем отправку запасных частей любой транспортной компанией, которая наиболее удобна для вас, по всей России и страны СНГ",
];

const InfoField = ({ label, value, icon, className = "" }) => (
  <div className={`flex flex-col p-2.5 ${className}`}>
    <div className="text-base text-[#828282]">{label}</div>
    <div className="flex gap-2.5 items-center mt-2.5">
      <img src={icon} alt="" className="object-contain w-5 aspect-square" />
      <div className="text-xl font-bold text-[#333]">{value}</div>
    </div>
  </div>
);

export function PaymentSection() {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaymentAndDelivery();
        console.log("Payment Response:", response);
        if (response?.payment?.data?.[0]) {
          setPaymentData(response.payment.data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="px-5 md:px-20 py-10">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-xl">Loading payment information...</div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="px-5 md:px-20 py-10">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </Container>
    );
  }

  const companyInfo = {
    legalName: {
      label: "Юридическое название:",
      value: paymentData?.LegalName || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f780b65c821f9b06dc1d0df8f24e601d2086bd7f2e101c017a472151608bba71",
    },
    inn: {
      label: "ИНН:",
      value: paymentData?.INN || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f780b65c821f9b06dc1d0df8f24e601d2086bd7f2e101c017a472151608bba71",
    },
    ogrn: {
      label: "ОГРН:",
      value: paymentData?.OGRN || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7ba34ca1609e75a756c18f0be9230e1b8218ff6813659ba74cca03ea778e9d8",
    },
    kpp: {
      label: "КПП:",
      value: paymentData?.KPP || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7ba34ca1609e75a756c18f0be9230e1b8218ff6813659ba74cca03ea778e9d8",
    },
    address: {
      label: "Юридический адрес:",
      value: paymentData?.LegalAddress || "НЕТ ДАННЫХ",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f57c2b23120777c9dcd974f85e8596878b6b08fe77967d86a8168770709dcef3",
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col bg-zinc-100 w-full relative overflow-hidden pt-4 pb-[100px]"
    >
      <PageTitle title="Оплата" />
      <Container className="px-5 md:px-20 pt-5">
        {/* Breadcrumbs */}
        <nav className="text-md flex gap-2 items-center py-1 font-semibold mb-8">
          <Link
            to="/"
            className="text-gray-500 hover:text-[#FAC612] transition-colors"
          >
            Главная
          </Link>
          <span className="text-gray-500">›</span>
          <span className="text-black">Оплата</span>
        </nav>

        <SectionTitle
          title="ОПЛАТА"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
        />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 space-y-6"
        >
          {paymentPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col justify-center w-5 min-h-[24px]">
                <div className="flex w-5 bg-[#FAC612] min-h-[10px]" />
              </div>
              <p className="text-2xl text-[#333] leading-relaxed">{point}</p>
            </motion.div>
          ))}

          <hr className="my-8 border-[#DADADA]" />

          <div className="flex flex-wrap">
            <div className="flex-1 min-w-[240px] basis-[18px]">
              <InfoField {...companyInfo.legalName} />
              <InfoField {...companyInfo.inn} />
            </div>

            <div className="flex-1 min-w-[240px] basis-[18px]">
              <InfoField {...companyInfo.ogrn} />
              <InfoField {...companyInfo.kpp} />
            </div>

            <div className="flex-1 min-w-[240px] basis-0">
              <InfoField {...companyInfo.address} className="h-full" />
            </div>
          </div>
        </motion.section>

        {/* Delivery Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 max-md:mt-10"
        >
          <SectionTitle
            title="ДОСТАВКА"
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
          />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 space-y-6 max-md:mt-10"
          >
            {deliveryPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col justify-center w-5 min-h-[24px]">
                  <div className="flex w-5 bg-[#FAC612] min-h-[10px]" />
                </div>
                <p className="text-2xl text-[#333] leading-relaxed">{point}</p>
              </motion.div>
            ))}

            <div className="flex gap-5 mt-10 flex-wrap">
              {deliveryCompanies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex flex-col justify-center bg-zinc-900 min-h-[218px] min-w-[240px] w-[424px] max-md:max-w-full"
                >
                  <img
                    src={company.Logo}
                    alt={`${company.Name} logo`}
                    className="object-contain flex-1 w-full aspect-[2.87]"
                  />
                  <div className="flex justify-between items-center p-5 w-full text-white">
                    <div className="text-2xl font-bold uppercase">
                      {company.Name}
                    </div>
                    <div className="text-xl font-semibold">
                      <a
                        href={company.TrackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#FAC612] transition-colors"
                      >
                        Отследить груз
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </Container>
    </motion.main>
  );
}

export default PaymentSection;
