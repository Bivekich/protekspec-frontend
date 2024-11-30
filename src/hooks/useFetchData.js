import { useEffect } from "react";
import { useData } from "../context/DataContext";
import * as api from "../services/api";

export function useFetchData() {
  const { setGlobalData, setIsLoading } = useData();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [hero, brands, about, warranty, payment, slider] =
          await Promise.all([
            api.getHero(),
            api.getBrands(),
            api.getAboutUs(),
            api.getWarranty(),
            api.getPaymentAndDelivery(),
            api.getSliderImages(),
          ]);

        setGlobalData({
          hero: hero?.data?.[0],
          brands: brands?.data,
          about: about?.data?.[0],
          warranty: warranty?.data?.[0],
          payment: payment?.data?.[0],
          slider: slider?.data,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [setGlobalData, setIsLoading]);
}
