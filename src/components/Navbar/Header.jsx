import { Link } from "react-router-dom";
import ContactInfo from "./ContactInfo";
import NavigationItem from "./NavigationItem";
import { Container } from "../common/Container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderCallPopup from "../OrderCallPopup/OrderCallPopup";
import Logo from "../../assets/images/Logo.svg";
import { useContactData } from "../../hooks/useContactData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderCallOpen, setIsOrderCallOpen] = useState(false);
  const { contactData } = useContactData();

  const contactDetails = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8563826b0ea4c4ad0f8d869d3ee1b7176ace029ffed5b50cfcea946920f1eb1",
      text: "Москва",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b0860771d4d9cda8bda7c472762e39a69dffa10da8136ea9ca6a42e5441242a",
      text: contactData?.WorkHours,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3e54e8c4c014c3137242d52b1982fbefa8e5f7326718b2d38cd3cd2417e0efe6",
      text: contactData?.Phone,
      href: contactData?.Phone
        ? `tel:${contactData.Phone.replace(/\D/g, "")}`
        : "tel:+79259267776",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/22e3bd1ff2167beb3e05f48218872ab5cadff7fd4cc3d164d0a69d2e170398fb",
      text: contactData?.Email,
      href: contactData?.Email
        ? `mailto:${contactData.Email}`
        : "mailto:customs@protek-auto.ru",
    },
  ];

  const navigationItems = [
    { text: "О компании", path: "/about" },
    { text: "Гарантия", path: "/warranty" },
    // { text: "Статьи", path: "/articles" },
    { text: "Доставка и оплата", path: "/PaymentandDelivery" },
    { text: "Бренды", path: "/brands" },
    { text: "Контакты", path: "/contact" },
  ];

  return (
    <header className="flex flex-col w-full">
      <div className="bg-white">
        <Container>
          <section className="flex flex-col lg:flex-row justify-between items-center px-5 lg:px-20 py-5 w-full gap-5">
            <div className="flex w-full justify-between items-center lg:w-1/3">
              <Link
                to="/"
                className="max-w-[486px] min-w-[180px] w-[180px] md:w-[250px] lg:w-full cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  loading="lazy"
                  src={Logo}
                  alt="Company Logo"
                  className="object-contain w-8/12"
                />
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="block md:hidden p-2"
              >
                <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                <div className="w-6 h-0.5 bg-black"></div>
              </button>
            </div>

            <div className="hidden md:flex flex-1 justify-end gap-12 min-w-[240px] lg:min-w-[600px]">
              <div className="flex flex-col justify-center space-y-3 min-w-[200px]">
                <ContactInfo
                  icon={contactDetails[0].icon}
                  text={contactDetails[0].text}
                />
                <ContactInfo
                  icon={contactDetails[1].icon}
                  text={contactDetails[1].text}
                />
              </div>

              <div className="flex flex-col justify-center space-y-3 min-w-[220px]">
                <ContactInfo
                  icon={contactDetails[2].icon}
                  text={contactDetails[2].text}
                  href={contactDetails[2].href}
                  noWrap
                />
                <ContactInfo
                  icon={contactDetails[3].icon}
                  text={contactDetails[3].text}
                  href={contactDetails[3].href}
                  noWrap
                />
              </div>
            </div>

            <div className="hidden md:flex w-auto lg:w-1/3 justify-end">
              <button
                onClick={() => setIsOrderCallOpen(true)}
                className="whitespace-nowrap gap-2.5 text-base px-10 py-4 font-bold uppercase rounded-md bg-[#FAC612] hover:bg-[#FAC612]/80 active:bg-[#FAC612]/90 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 min-h-[50px] text-[#1A1A1A]"
              >
                Заказать звонок
              </button>
            </div>
          </section>
        </Container>
      </div>

      <div className="bg-[#1A1A1A]">
        <Container>
          <nav className="hidden md:flex justify-center items-center px-5 lg:px-20 py-5 w-full text-lg font-semibold text-white overflow-x-auto">
            <div className="flex flex-nowrap gap-5 lg:gap-10 items-center self-stretch my-auto min-w-max px-5">
              {navigationItems.map((item, index) => (
                <NavigationItem key={index} text={item.text} path={item.path} />
              ))}
            </div>
          </nav>
        </Container>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-screen bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-5 border-b border-[#DADADA]">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-[180px]"
                >
                  <img
                    src={Logo}
                    alt="Company Logo"
                    className="object-contain w-full aspect-[6.58] max-md:w-8/12"
                  />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
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
              </div>

              <div className="flex flex-col p-5 space-y-4">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="text-lg font-semibold text-[#1A1A1A] hover:text-[#FAC612] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>

              <div className="mt-auto p-5 space-y-4 bg-[#F5F5F5]">
                {contactDetails.map((detail, index) => (
                  <ContactInfo
                    key={index}
                    icon={detail.icon}
                    text={detail.text}
                    href={detail.href}
                  />
                ))}
                <button
                  onClick={() => {
                    setIsOrderCallOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full gap-2.5 text-base px-10 py-4 font-bold uppercase rounded-md bg-[#FAC612] hover:bg-[#FAC612]/80 active:bg-[#FAC612]/90 transition-all duration-150 text-[#1A1A1A]"
                >
                  Заказать звонок
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <OrderCallPopup
        isOpen={isOrderCallOpen}
        onClose={() => setIsOrderCallOpen(false)}
      />
    </header>
  );
};

export default Header;
