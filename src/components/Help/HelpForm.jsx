import { useState } from "react";
import { motion } from "framer-motion";
import * as React from "react";
import ArrowGraySvg from "../../assets/images/ArrowGray.svg?react";
import tractor from "../../assets/images/tractor.png";
import { Container } from "../common/Container";
import { submitContactForm } from "../../services/api";

// FormInput component moved inline
function FormInput({
  label,
  placeholder,
  required,
  name,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="flex flex-col flex-1">
      <label className="text-base font-bold text-white">
        {label} {required && <span className="text-[#FAC612]">*</span>}
      </label>
      <input
        type={name === "phone" ? "tel" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="gap-2.5 px-3.5 py-4 mt-2.5 w-full text-sm font-light border-b border-solid border-b-[#FAC612] min-h-[50px] text-[#828282] bg-transparent placeholder:text-[#828282] focus:outline-none"
      />
    </div>
  );
}

const formFields = [
  {
    label: "Имя",
    name: "name",
    placeholder: "Введите ваше имя",
    required: false,
  },
  {
    label: "Номер телефона",
    name: "phone",
    placeholder: "+7 999 999 99 99",
    required: true,
  },
];

// Animation variants for the background arrows
const arrowVariants = {
  initial: { opacity: 0, scaleY: 1.2 },
  animate: { opacity: 0.03, scaleY: 1.5 },
};

function HelpForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    source: "help_page",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        source: "help_page",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        comment: "",
        source: "help_page",
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

  return (
    <main className="bg-[#1A1A1A] w-full relative overflow-hidden py-10 ">
      <Container className="relative">
        {/* Animated Background - adjust arrows for mobile */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={arrowVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute text-gray-500"
                style={{
                  left: `${10 + i * 25}%`,
                  height: "100%",
                  width: "150px",
                  "@media (min-width: 768px)": {
                    width: "250px",
                    left: `${20 + i * 20}%`,
                  },
                }}
              >
                <img src={ArrowGraySvg} alt="" className="w-full h-full" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 md:px-20">
          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-wrap gap-2.5 items-center w-full text-4xl md:text-6xl font-bold text-white uppercase whitespace-nowrap"
          >
            <motion.img
              transition={{ duration: 0.8 }}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto aspect-[0.59] fill-[#FAC612] w-[35px] md:w-[46px]"
            />
            <h1 className="flex-1 text-3xl md:text-5xl shrink self-stretch my-auto basis-0">
              Нужна помощь?
            </h1>
          </motion.header>

          {/* Form Section */}
          <div className="relative z-10 flex mt-10 lg:mt-0 flex-col-reverse lg:flex-row justify-center items-center md:items-center w-full">
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col mt-10 w-full lg:w-[40%] min-w-[280px]"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                Заполните эту форму, и мы свяжемся с вами в ближайшее время
              </motion.h2>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col mt-5 w-full"
              >
                <div className="flex flex-col lg:flex-row gap-5 md:gap-10 justify-center items-stretch lg:items-end">
                  {formFields.map((field, index) => (
                    <FormInput
                      key={index}
                      {...field}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  ))}
                </div>

                <div className="flex flex-col mt-5 w-full">
                  <label
                    htmlFor="comment"
                    className="text-base font-bold text-white"
                  >
                    Комментарий
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="overflow-hidden gap-2.5 focus:outline-none self-stretch px-3.5 py-4 mt-2.5 w-full text-sm font-light border-b border-solid border-b-[#FAC612] min-h-[50px] text-[#828282] bg-transparent placeholder:text-[#828282] max-md:max-w-full"
                    placeholder="Оставьте свои комментарии"
                  />
                </div>

                <div className="flex flex-col mt-5 w-full">
                  <p className="text-xs text-neutral-100">
                    Нажимая кнопку &quot;Отправить&quot; вы соглашаетесь с{" "}
                    <span className="italic underline">
                      <a href="/userpolicy">политикой конфиденциальности</a>
                    </span>
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2.5 px-8 py-4 md:px-10 md:py-5 mt-2.5 w-full text-base font-bold uppercase whitespace-nowrap rounded-md bg-[#FAC612] hover:bg-[#FAC612]/80 transition-colors min-h-[50px] text-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </button>
                </div>
              </motion.form>
            </motion.section>

            <img
              src={tractor}
              alt="Tractor"
              className="w-[500px] lg:w-[600px] xl:w-[800px] object-contain mt-10 md:mt-0 md:self-center"
            />
          </div>
        </div>
      </Container>
    </main>
  );
}

export default HelpForm;
