// Функция для получения переменных окружения с учетом window.env
export const getEnv = (key) => {
  // Сначала пробуем взять из window.env (для Docker)
  if (window.env && window.env[key]) {
    return window.env[key];
  }
  // Затем из import.meta.env (для dev режима)
  return import.meta.env[key];
};

// Функция для формирования URL с учетом API URL
export const getApiUrl = (path) => {
  if (!path) return '';
  const apiUrl = getEnv("VITE_API_URL");
  return `${apiUrl}${path}`;
}; 