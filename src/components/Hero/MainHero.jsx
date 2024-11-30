import { useData } from "../../context/DataContext";
import { HeroSection } from "./HeroSection";

export const MainHero = () => {
  const { globalData } = useData();
  const heroData = globalData.hero;

  if (!heroData) {
    return (
      <HeroSection
        title="Прямые поставки запчастей из Европы от всех известных мировых брендов"
        backgroundImage="https://cdn.builder.io/api/v1/image/assets/TEMP/c210d090fd8bb08ee51b4095bf806e6afd6f4b4b6ef01d2744231c7c4ca607bc"
      />
    );
  }

  return (
    <HeroSection
      title={heroData.title}
      backgroundImage={`${import.meta.env.VITE_API_URL}${
        heroData.backgroundImage.url
      }`}
    />
  );
};
