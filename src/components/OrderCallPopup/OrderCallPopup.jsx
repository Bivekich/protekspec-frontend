import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { submitContactForm } from "../../services/api";
import { useState } from "react";

export function OrderCallPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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
        source: "popup",
      });

      // Reset form and close popup
      setFormData({
        name: "",
        phone: "",
        comment: "",
      });
      onClose();

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col p-5 md:p-12 bg-white max-w-[700px] rounded-lg relative w-full"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 md:top-6 right-3 md:right-6 p-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="flex flex-col w-full text-center">
            <h2 className="text-xl md:text-4xl font-bold text-[#1A1A1A]">
              Заказать звонок
            </h2>
            <p className="mt-3 md:mt-6 text-base md:text-2xl text-[#1A1A1A]">
              Заполните эту форму и наш менеджер свяжется с вами
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-6 md:mt-12 w-full"
          >
            <div className="flex flex-col gap-3 md:gap-5">
              <div className="flex flex-col">
                <label className="text-sm md:text-lg font-bold text-[#1A1A1A]">
                  ФИО <span className="text-[#FAC612]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  required
                  disabled={isSubmitting}
                  className="overflow-hidden px-3.5 py-4 mt-2.5 w-full text-base font-light border-b border-[#FAC612] bg-transparent text-[#828282] placeholder:text-base md:placeholder:text-xl focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm md:text-lg font-bold text-[#1A1A1A]">
                  Номер телефона <span className="text-[#FAC612]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 999 999 99 99"
                  required
                  disabled={isSubmitting}
                  className="overflow-hidden px-3.5 py-4 mt-2.5 w-full text-base font-light border-b border-[#FAC612] bg-transparent text-[#828282] placeholder:text-base md:placeholder:text-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 md:mt-5">
              <label className="text-sm md:text-lg font-bold text-[#1A1A1A]">
                Комментарии
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Оставьте ваши пожелания"
                disabled={isSubmitting}
                className="overflow-hidden px-3.5 py-4 mt-2.5 w-full text-base font-light border-b border-[#FAC612] min-h-[50px] text-[#828282] placeholder:text-base resize-none md:placeholder:text-xl focus:outline-none"
                rows={3}
              />
            </div>

            <p className="mt-3 md:mt-5 text-base md:text-lg text-[#1A1A1A] text-center">
              Нажимая кнопку &quot;Отправить&quot; вы соглашаетесь с <br></br>
              <Link
                to="/userpolicy"
                className="italic underline hover:text-[#FAC612]"
              >
                политикой конфиденциальности
              </Link>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FAC612] text-[#1A1A1A] py-3 md:py-5 mt-3 md:mt-5 rounded-md hover:bg-[#FAC612]/80 transition-colors text-sm md:text-lg font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default OrderCallPopup;
