import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import FormInput from "../Contact/FormInput";
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

export function AnswerNotFound() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    source: "answer_not_found",
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
        source: "answer_not_found",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        comment: "",
        source: "answer_not_found",
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
    <Container className="">
      <div className="bg-[#1A1A1A] py-16 mb-[160px]">
        <div className="px-5 md:px-20 flex flex-col lg:flex-row justify-between gap-10 lg:gap-20 ">
          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-2.5">
              <motion.img
                transition={{ duration: 0.8 }}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4"
                alt=""
                className="w-[46px]"
              />
              <h1 className="text-4xl lg:text-5xl font-bold text-white uppercase">
                Не нашли своего производителя?
              </h1>
            </div>
            <p className="text-2xl lg:text-3xl text-white mt-10 lg:mt-20 font-normal">
              По другим брендам и производителям оставляйте запрос в данной
              форме
            </p>
          </motion.header>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-10 mt-10"
          >
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full">
                {formFields.map((field, index) => (
                  <div key={index} className="flex-1">
                    <FormInput
                      label={field.label}
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
                      placeholder={field.placeholder}
                      required={field.required}
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
                  disabled={isSubmitting}
                  className="overflow-hidden gap-2.5 self-stretch px-3.5 py-4 mt-2.5 w-full text-sm font-light border-b border-solid border-b-[#FAC612] min-h-[50px] text-[#828282] bg-[#1A1A1A] placeholder:text-[#828282]"
                  rows={3}
                />
              </div>

              <div className="mt-5">
                <p className="text-xs text-neutral-100">
                  Нажимая кнопку &quot;Отправить&quot; вы соглашаетесь с{" "}
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
                  className="w-full bg-[#FAC612] text-[#1A1A1A] py-5 mt-2.5 rounded-md hover:bg-[#FAC612]/80 transition-colors text-base font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
