import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Header";
import Contact from "./components/Contact/ContactForm";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainHero } from "./components/Hero/MainHero";
import AboutUs from "./components/aboutUs/AboutUs";
import HelpForm from "./components/Help/HelpForm";
import { BrandSection } from "./components/brands/BrandSection";
// import { ArticlesSection } from "./components/articles/ArticleSession";
import { Divider } from "./components/Divider";
import { BenefitsSection } from "./components/benefits/BenefitsSection";
import AboutUsPage from "./components/aboutUs/AboutUsImage";
import { AdvantagesSection } from "./components/advantages/AdvantagesSection";
import { CertificatesSection } from "./components/certificates/Certificates";
import { ImageSliderSection } from "./components/ImageSlider";
import { ContactInfo } from "./components/contactInfo/ContactInfo";
import { ContactForm } from "./components/contactForm/ContactForm";
import Warranty from "./components/warranty/Warranty";
import { AnswerNotFound } from "./components/contactForm/answerNotFound";
import { BrandList } from "./components/brands/BrandList";
import PolicySection from "./components/policy/PolicySection";
import PaymentSection from "./components/payment/PaymentSection";
import { DataProvider } from "./context/DataContext";
import { useFetchData } from "./hooks/useFetchData";
import { usePageTransition } from "./hooks/usePageTransition";
import DeliveryForm from "./components/delivery/DeliveryForm";

function AppContent() {
  useFetchData();
  usePageTransition();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {" "}
            <Navbar />
            <MainHero />
            <BenefitsSection />
            <AboutUs />
            <HelpForm />
            <BrandSection />
            <Divider />
            {/* <ArticlesSection/> */}
            <Contact />
            <Footer />
          </>
        }
      />
      <Route
        path="/About"
        element={
          <>
            <Navbar />
            <AboutUsPage />
            <AdvantagesSection />
            <ImageSliderSection />
            {/* <CertificatesSection /> */}
            <Contact />
            <Footer />
          </>
        }
      />
      <Route
        path="/Contact"
        element={
          <>
            <Navbar />
            <ContactInfo />
            <ContactForm />
            <Footer />
          </>
        }
      />
      <Route
        path="/Warranty"
        element={
          <>
            <Navbar />
            <Warranty />
            <ContactForm />
            <Footer />
          </>
        }
      />
      <Route
        path="/Brands"
        element={
          <>
            <Navbar />
            <BrandList />
            <AnswerNotFound />
            <Footer />
          </>
        }
      />
      <Route
        path="/UserPolicy"
        element={
          <>
            <Navbar />
            <PolicySection />
            <Footer />
          </>
        }
      />
      <Route
        path="/PaymentandDelivery"
        element={
          <>
            <Navbar />
            <PaymentSection />
            <DeliveryForm />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;
