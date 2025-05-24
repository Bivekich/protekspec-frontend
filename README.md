# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# protekspec-frontend

## Запуск через Docker

### Предварительные требования
- Установленный Docker и Docker Compose

### Подготовка к запуску
1. Создайте файл `stack.env` с нужными переменными окружения на основе `stack.env` (уже существует в репозитории)
2. Укажите правильные значения для переменных:
   - `VITE_API_URL` - URL вашего API
   - `VITE_API_TOKEN` - токен доступа к API
   - `VITE_TELEGRAM_BOT_TOKEN` - токен Telegram бота
   - `VITE_TELEGRAM_CHAT_ID` - ID чата Telegram для отправки сообщений
   - `PORT` - порт на котором будет работать приложение (по умолчанию 4173)

### Запуск
```bash
# Сборка и запуск контейнеров
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка контейнеров
docker-compose down
```

После запуска приложение будет доступно по адресу http://localhost:4173 (или другому порту, если вы изменили значение PORT в stack.env).
