import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getHero = async () => {
  try {
    const response = await api.get("/api/heroes?populate=backgroundImage");
    return response.data;
  } catch (error) {
    console.error("Error fetching hero:", error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get("/api/brands", {
      params: {
        populate: "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const getAboutUs = async () => {
  try {
    const response = await api.get("/api/about-uses", {
      params: {
        populate: {
          mainBrands: {
            fields: ["url", "alternativeText"],
          },
          additionalBrands: {
            fields: ["url", "alternativeText"],
          },
          features: true,
          titleIcon: {
            fields: ["url"],
          },
          bigImage: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching about-us:", error);
    throw error;
  }
};

export const getWarranty = async () => {
  try {
    const response = await api.get("/api/warranties", {
      params: {
        populate: {
          questions: true,
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty:", error);
    throw error;
  }
};

export const getSliderImages = async () => {
  try {
    const response = await api.get("/api/slider-images", {
      params: {
        populate: {
          slider: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching slider images:", error);
    throw error;
  }
};

export const getCertificates = async () => {
  try {
    const response = await api.get("/api/certificates", {
      params: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    });
    console.log("Certificate response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
};

export const getPaymentAndDelivery = async () => {
  try {
    const [paymentResponse, contactResponse] = await Promise.all([
      api.get("/api/payments", {
        params: {
          populate: "*",
        },
      }),
      api.get("/api/contacts", {
        params: {
          populate: "*",
        },
      }),
    ]);

    return {
      payment: paymentResponse.data,
      contact: contactResponse.data,
    };
  } catch (error) {
    console.error("Error fetching payment and delivery:", error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    const message = `
📋 Новая заявка с сайта
      
👤 Имя: ${formData.name || "Не указано"}
📞 Телефон: ${formData.phone}
💬 Комментарий: ${formData.comment || "Не указано"}
📍 Источник: ${formData.source}
    `.trim();

    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

// Add other API calls as needed...

export default api;
