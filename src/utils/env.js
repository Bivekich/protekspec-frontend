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
  
  // Отладочная информация
  if (!apiUrl) {
    console.error("API URL не определен! Проверьте переменные окружения.");
    console.log("window.env:", window.env);
    console.log("import.meta.env.VITE_API_URL:", import.meta.env.VITE_API_URL);
    return path; // Возвращаем только путь, если apiUrl не определен
  }
  
  // Убираем двойной слэш, если он есть
  if (apiUrl.endsWith('/') && path.startsWith('/')) {
    return `${apiUrl}${path.substring(1)}`;
  }
  
  // Добавляем слэш, если его нет ни в apiUrl, ни в path
  if (!apiUrl.endsWith('/') && !path.startsWith('/')) {
    return `${apiUrl}/${path}`;
  }
  
  return `${apiUrl}${path}`;
}; 