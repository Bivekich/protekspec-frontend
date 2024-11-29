import { useState, useEffect } from "react";
import { getPaymentAndDelivery } from "../services/api";

export function useContactData() {
  const [paymentData, setPaymentData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaymentAndDelivery();
        if (response?.payment?.data?.[0]) {
          setPaymentData(response.payment.data[0]);
        }
        if (response?.contact?.data?.[0]) {
          setContactData(response.contact.data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { paymentData, contactData, loading, error };
}
