import ContactInfo from "./Contactinfo";
import SocialButton from "./SocialButton";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderCallPopup from "../OrderCallPopup/OrderCallPopup";
import Container from "../common/Container";
import { useContactData } from "../../hooks/useContactData";

const Footer = () => {
  const [isOrderCallOpen, setIsOrderCallOpen] = useState(false);
  const { contactData } = useContactData();

  const navigationLinks = [
    { text: "О компании", path: "/about" },
    { text: "Гарантия", path: "/warranty" },
    // { text: "Статьи", path: "/articles" },
    { text: "Доставка и оплата", path: "/PaymentandDelivery" },
    { text: "Бренды", path: "/brands" },
    { text: "Контакты", path: "/contact" },
  ];

  const contactDetails = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/68154306a547b1b9798fa0dc3c7679990d5a9f59b1a0d9af4792cbfa20f43207",
      text: contactData?.Address || "НЕТ ДАННЫХ",
      isUpperCase: false,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e3c789de4b8629add4cb48e43ed0ed14a0e96b229d06b5c8cdbae850a5103512",
      text: contactData?.WorkHours || "НЕТ ДАННЫХ",
      isUpperCase: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8a8b591ce05920c571e06cccc354aea238d92e9ecf53673c610e2b648cc7fa0",
      text: contactData?.Phone || "НЕТ ДАННЫХ",
      isUpperCase: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c344d3a85eedab93f5b9a00ce252c7cf8e1b97d382a7f9f6da627903a2fc707",
      text: contactData?.Email || "НЕТ ДАННЫХ",
      isUpperCase: false,
    },
  ];

  const socialIcons = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/57d51a455b0bd52621191c7dcf5c8192277c79c811de2c7c2f093775fb22bfd7",
      link: contactData?.WhatsAppLink,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9bf9189c70909caffebc5a9b79fa2c16d9c00a4f2df78780b77a467d0711ba73",
      link: contactData?.TelegramLink,
    },
  ];

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePolicyClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col bg-zinc-100 border-t border-solid border-t-[#DADADA]">
      {/* Desktop Layout */}
      <Container>
        <div className="hidden lg:flex flex-col px-5 lg:px-20 pt-5 pb-10 w-full">
          <div className="flex flex-wrap justify-between items-start w-full gap-8">
            <div className="flex flex-col flex-1 shrink items-start text-sm basis-0 min-w-[240px]">
              <img
                loading="lazy"
                src={Logo}
                alt="Company Logo"
                className="object-contain w-7/12 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                onClick={() => handleLogoClick()}
              />
              <div className="flex flex-row gap-20 items-center mt-5 max-w-full w-[600px]">
                <div className="hidden lg:flex flex-col text-lg justify-center self-stretch my-auto min-w-[240px]">
                  {contactDetails.slice(0, 4).map((contact, index) => (
                    <ContactInfo key={index} {...contact} />
                  ))}
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap gap-5 justify-center items-center text-lg min-w-[240px] text-[#1A1A1A]">
              {navigationLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(link.path)}
                  className="self-stretch my-auto hover:text-[#FAC612] hover:-translate-y-0.5 transition-all duration-200"
                  tabIndex="0"
                >
                  {link.text}
                </button>
              ))}
            </nav>

            <div className="flex flex-col flex-1 shrink items-end basis-0 min-w-[240px]">
              <button
                onClick={() => setIsOrderCallOpen(true)}
                className="gap-2.5 text-base px-10 py-4 font-bold uppercase rounded-md bg-[#FAC612] hover:bg-[#FAC612]/80 active:bg-[#FAC612]/90 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 min-h-[50px] text-[#1A1A1A]"
              >
                Заказать звонок
              </button>
              <div className="flex gap-5 items-start mt-5">
                {socialIcons.map(
                  (social, index) =>
                    social.link && (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialButton icon={social.icon} />
                      </a>
                    )
                )}
              </div>
            </div>
          </div>

          <hr className="mt-5 w-full border-t border-[#DADADA]" />

          <div className="mt-5 text-md text-center text-[#828282] max-md:max-w-full">
            <p>
              {new Date().getFullYear()} © Все права защищены. <br />
              Официальный сайт ООО «ПРОТЕК» – интернет-магазин запчастей для
              специальной, дорожной, строительной техники. <br />
              ИНН: 5007117840 КПП: 500701001. Принимаем наличный и безналичный
              расчет.
            </p>
            <Link
              to="/userpolicy"
              onClick={handlePolicyClick}
              className="mt-2 inline-block hover:text-[#FAC612] text-sm text-gray-800 transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </Container>

      {/* Mobile and Tablet Layout */}
      <Container className="lg:hidden">
        <div className="flex flex-col px-5 py-10">
          <img
            src={Logo}
            alt="Company Logo"
            className="w-[200px] mb-8"
            onClick={() => handleLogoClick()}
          />

          <nav className="flex flex-col gap-4 mb-8">
            {navigationLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(link.path)}
                className="text-left text-base text-[#1A1A1A] hover:text-[#FAC612] transition-colors"
              >
                {link.text}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mb-8">
            {contactDetails.map((contact, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <img
                  src={contact.icon}
                  alt=""
                  className="w-5 h-5 shrink-0 mt-1"
                />
                <span
                  className={`text-[#1A1A1A] break-words ${
                    contact.isUpperCase ? "uppercase" : ""
                  }`}
                >
                  {contact.text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOrderCallOpen(true)}
            className="w-full py-4 mb-6 text-base font-bold bg-[#FAC612] rounded-md text-[#1A1A1A] uppercase hover:bg-[#FAC612]/80 transition-colors"
          >
            Заказать звонок
          </button>

          <div className="flex gap-4 mb-8">
            {socialIcons.map(
              (social, index) =>
                social.link && (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialButton icon={social.icon} />
                  </a>
                )
            )}
          </div>

          <div className="text-xs text-center text-[#828282]">
            <p>
              {new Date().getFullYear()} © Все права защищены. <br />
              Официальный сайт ООО «ПРОТЕК» – интернет-магазин запчастей для
              специальной, дорожной, строительной техники. <br />
              ИНН: 5007117840 КПП: 500701001. Принимаем наличный и безналичный
              расчет.
            </p>
            <Link
              to="/userpolicy"
              onClick={handlePolicyClick}
              className="mt-4 inline-block hover:text-[#FAC612] text-lg text-gray-900 font-semibold transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </Container>

      <OrderCallPopup
        isOpen={isOrderCallOpen}
        onClose={() => setIsOrderCallOpen(false)}
      />
    </footer>
  );
};

export default Footer;
