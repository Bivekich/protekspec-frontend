import { useEffect, useState } from "react";
import { HeroSection } from "./HeroSection";
import { getHero } from "../../services/api";

export const MainHero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHero();
        if (data?.data?.[0]) {
          setHeroData(data.data[0]);
        } else {
          setError("No hero data found");
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !heroData) {
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
