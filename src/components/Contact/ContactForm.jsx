import { useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { useContactData } from "../../hooks/useContactData";
import { Link } from "react-router-dom";
import { submitContactForm } from "../../services/api";

const formFields = [
  {
    label: "Имя",
    placeholder: "Введите ваше имя",
    required: false,
  },
  {
    label: "Номер телефона",
    placeholder: "+7 999 999 99 99",
    required: true,
  },
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    source: "contact_page",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { contactData } = useContactData();

  const contactInfo = [
    {
      title: "Адрес",
      content:
        contactData?.Address || "г. Москва, Походный проезд 4к1, офис 211",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a1535f6db560adf6fab2928c4c90a7400c0886a27c1353b18ebd0494653ee95",
    },
    {
      title: "Время работы",
      content: contactData?.WorkHours || "ПН-СБ 09:00 - 18:00, ВС - Выходной",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e69436894519eccb2a8c27e15dd359779784afa5a74dd019891c282ba1316bfe",
    },
  ];

  const contactMethods = [
    {
      title: "Телефон и почта",
      items: [
        {
          content: contactData?.Phone || "+7 (925) 926-77-76",
          iconSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/062d94981d8969f3a668fccdddfcc03868c8367362ac31ff6cabab55215512cc",
          isUppercase: true,
          href: contactData?.Phone
            ? `tel:${contactData.Phone.replace(/\D/g, "")}`
            : "tel:+79259267776",
        },
        {
          content: contactData?.Email || "customs@protek-auto.ru",
          iconSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/22e3bd1ff2167beb3e05f48218872ab5cadff7fd4cc3d164d0a69d2e170398fb",
          isUppercase: false,
          href: contactData?.Email
            ? `mailto:${contactData.Email}`
            : "mailto:customs@protek-auto.ru",
        },
      ],
    },
  ];

  const messengerIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60221597df6e43e83a3baf4e5c85701c8c106a01275fd69e7d319d6d26f0787d",
      alt: "WhatsApp",
      href: contactData?.WhatsAppLink || "#",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/67f404e93a246e8abc12d854486e8f36d9c900bdc4edd5feb4c6485699fe6db0",
      alt: "Telegram",
      href: contactData?.TelegramLink || "#",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        source: "contact_page",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        comment: "",
        source: "contact_page",
      });

      // Show success message
      alert("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-[#1A1A1A] w-full">
      <Container className="py-16">
        <div className="px-5 md:px-20">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2.5 items-center w-full text-6xl font-bold text-white uppercase whitespace-nowrap max-md:max-w-full max-md:text-4xl"
          >
            <motion.img
              transition={{ duration: 0.8 }}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto aspect-[0.59] fill-[#FAC612] w-[46px] max-md:w-[35px]"
            />
            <h1 className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full text-4xl md:text-5xl">
              Контакты
            </h1>
          </motion.header>

          <div className="flex max-md:flex-col">
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col mt-10 w-1/3 min-w-[320px] max-xl:w-full"
            >
              <h2 className="text-3xl font-bold text-white max-md:text-xl">
                Заполните эту форму, и мы свяжемся с вами в ближайшее время
              </h2>

              <form
                className="flex flex-col mt-5 w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-wrap gap-10 justify-center items-end w-full max-md:flex-col max-md:gap-5">
                  {formFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex flex-col flex-1 max-lg:w-full"
                    >
                      <label className="text-base font-bold text-white mb-2.5">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-[#FAC612]">*</span>
                        )}
                      </label>
                      <input
                        type={
                          field.label.toLowerCase() === "номер телефона"
                            ? "tel"
                            : "text"
                        }
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full px-3.5 py-4 text-sm font-light border-b border-[#FAC612] bg-transparent text-[#828282] placeholder:text-[#828282] focus:outline-none"
                        name={
                          field.label.toLowerCase() === "номер телефона"
                            ? "phone"
                            : "name"
                        }
                        value={
                          formData[
                            field.label.toLowerCase() === "номер телефона"
                              ? "phone"
                              : "name"
                          ]
                        }
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col mt-5 w-full">
                  <label className="text-base font-bold text-white">
                    Комментарий
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Оставьте свои комментарии"
                    className="overflow-hidden gap-2.5 self-stretch px-3.5 py-4 mt-2.5 w-full text-sm font-light border-b border-[#FAC612] min-h-[50px] text-[#828282] bg-transparent placeholder:text-[#828282] focus:outline-none"
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mt-5">
                  <p className="text-xs text-neutral-100">
                    Нажимая кнопку "Отправить" вы соглашаетесь с{" "}
                    <Link
                      to="/userpolicy"
                      className="italic underline hover:text-white/80"
                    >
                      политикой конфиденциальности
                    </Link>
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#FAC612] text-[#1A1A1A] py-5 mt-2.5 rounded-md hover:bg-[#FAC612]/80 transition-colors text-base font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </button>
                </div>
              </form>
            </motion.section>

            <section className="w-2/3 h-full min-h-[400px] flex justify-end rounded-md overflow-hidden -mt-[220px] z-[4] relative max-xl:hidden">
              <iframe
                src={
                  contactData?.MapUrl ||
                  "https://yandex.ru/map-widget/v1/?um=constructor%3Abe4f7fa3a7abc5fbd66b83e2ee96f599e36449c6263a532d7d9391f89d3f42d3&amp;source=constructor"
                }
                width="90%"
                height="534"
                frameBorder="0"
                className="rounded-none shadow-2xl"
              />

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-5 right-10 rounded-md overflow-hidden w-[83%] bg-[#F8F8F8] p-10 flex justify-between items-start max-md:px-5"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col min-w-[240px]"
                >
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className={`flex flex-col ${index > 0 ? "mt-2.5" : ""}`}
                    >
                      <h3 className="text-sm text-[#828282]">{item.title}</h3>
                      <div className="flex gap-2.5 items-center mt-2.5">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          loading="lazy"
                          src={item.iconSrc}
                          alt=""
                          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                        />
                        <p className="text-base font-bold text-[#1A1A1A]">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col"
                >
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="flex flex-col"
                    >
                      <h3 className="text-sm text-[#828282]">{method.title}</h3>
                      <div className="flex flex-col items-start mt-2.5">
                        {method.items.map((item, itemIndex) => (
                          <motion.a
                            key={itemIndex}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, x: 5 }}
                            className={`flex gap-2.5 items-center ${
                              item.isUppercase ? "uppercase" : ""
                            } ${itemIndex > 0 ? "mt-2.5" : ""}`}
                          >
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              loading="lazy"
                              src={item.iconSrc}
                              alt=""
                              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                            />
                            <p className="text-base font-bold text-[#1A1A1A]">
                              {item.content}
                            </p>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col"
                >
                  <h3 className="text-sm text-[#828282]">Мессенджеры</h3>
                  <div className="flex gap-4 mt-2.5">
                    {messengerIcons.map((icon, index) => (
                      <motion.a
                        key={index}
                        href={icon.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 1.4 + index * 0.2,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-black rounded-full p-3 cursor-pointer hover:opacity-80 transition-all"
                      >
                        <img
                          loading="lazy"
                          src={icon.src}
                          alt={icon.alt}
                          className="w-full h-full object-contain"
                        />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </section>

            <div className="mt-10 space-y-6 xl:hidden md:ml-10">
              {/* Address */}
              <div>
                <h3 className="text-sm text-[#828282]">Адрес</h3>
                <div className="flex items-center gap-2.5 mt-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a1535f6db560adf6fab2928c4c90a7400c0886a27c1353b18ebd0494653ee95"
                    alt=""
                    className="w-5 h-5 object-contain"
                  />
                  <p className="text-base font-bold text-white">
                    г. Москва, Походный проезд 4к1, офис 211
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h3 className="text-sm text-[#828282]">Время работы</h3>
                <div className="flex items-center gap-2.5 mt-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e69436894519eccb2a8c27e15dd359779784afa5a74dd019891c282ba1316bfe"
                    alt=""
                    className="w-5 h-5 object-contain"
                  />
                  <p className="text-base font-bold text-white">
                    ПН-СБ 09:00 - 18:00, ВС - Выходной
                  </p>
                </div>
              </div>

              {/* Phone and Email */}
              <div>
                <h3 className="text-sm text-[#828282]">Телефон и почта</h3>
                <div className="flex flex-col gap-2.5 mt-2">
                  {contactMethods[0].items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-2.5"
                    >
                      <img
                        src={item.iconSrc}
                        alt=""
                        className="w-5 h-5 object-contain"
                      />
                      <p
                        className={`text-base font-bold text-white ${
                          item.isUppercase ? "uppercase" : ""
                        }`}
                      >
                        {item.content}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Messengers */}
              <div>
                <h3 className="text-sm text-[#828282]">Мессенджеры</h3>
                <div className="flex gap-4 mt-2">
                  {messengerIcons.map((icon, index) => (
                    <a
                      key={index}
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#FAC612] rounded-full p-3 text-black hover:opacity-80 transition-all"
                    >
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        className="w-full h-full object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default ContactForm;
