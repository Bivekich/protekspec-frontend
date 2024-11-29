import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getWarranty } from "../../services/api";
import { Container } from "../common/Container";
import { Link } from "react-router-dom";
import SectionTitle from "../aboutUs/SectionTitle";
import { PageTitle } from "../PageTitle";
const WarrantyQuestion = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-b border-[#DADADA] py-6 "
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-xl font-bold text-[#333]">{question}</h3>
        <motion.img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b40ac9335dee10b5ba2ff7be741a1a6ef509d0eaac7ad1878302e04ea6f2f89?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6"
          alt="Dropdown arrow"
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-lg text-[#666] whitespace-pre-line">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export function Warranty() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openQuestion, setOpenQuestion] = useState(1);

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const response = await getWarranty();
        if (response?.data) {
          const formattedQuestions = response.data.map((warranty) => ({
            id: warranty.id,
            question: warranty.title,
            answer: warranty.description,
          }));

          setQuestions(formattedQuestions);
          if (formattedQuestions.length > 0) {
            setOpenQuestion(formattedQuestions[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetching warranty:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWarranty();
  }, []);

  if (loading) {
    return (
      <Container className="px-5 md:px-20 pt-5 ">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-xl">Loading warranty information...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="px-5 md:px-20 ">
      <PageTitle title="Гарантия" />
      <div className="flex flex-col py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-md font-semibold">
          <Link to="/" className="text-gray-500 hover:text-[#FAC612]">
            Главная
          </Link>
          <span className="text-gray-500">›</span>
          <span className="text-black">Гарантия</span>
        </div>

        {/* Title */}
        <SectionTitle
          title="ГАРАНТИЯ"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881"
        />

        {/* Questions */}
        <div className="mt-10">
          {questions.map((item) => (
            <WarrantyQuestion
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openQuestion === item.id}
              onClick={() =>
                setOpenQuestion(openQuestion === item.id ? null : item.id)
              }
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Warranty;
