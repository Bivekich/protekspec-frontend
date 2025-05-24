FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Скрипт для создания env-config.js во время запуска контейнера
RUN echo '#!/bin/sh' > /app/create-env-config.sh && \
    echo 'echo "window.env = {" > /app/dist/env-config.js' >> /app/create-env-config.sh && \
    echo 'echo "  VITE_API_URL: \"$VITE_API_URL\"," >> /app/dist/env-config.js' >> /app/create-env-config.sh && \
    echo 'echo "  VITE_API_TOKEN: \"$VITE_API_TOKEN\"," >> /app/dist/env-config.js' >> /app/create-env-config.sh && \
    echo 'echo "  VITE_TELEGRAM_BOT_TOKEN: \"$VITE_TELEGRAM_BOT_TOKEN\"," >> /app/dist/env-config.js' >> /app/create-env-config.sh && \
    echo 'echo "  VITE_TELEGRAM_CHAT_ID: \"$VITE_TELEGRAM_CHAT_ID\"" >> /app/dist/env-config.js' >> /app/create-env-config.sh && \
    echo 'echo "};" >> /app/dist/env-config.js' >> /app/create-env-config.sh && \
    chmod +x /app/create-env-config.sh

# Создаем точку входа, которая сначала создаст env-config.js, а затем запустит приложение
COPY --from=build /app/dist/index.html /app/dist/index.html.template
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo '/app/create-env-config.sh' >> /app/entrypoint.sh && \
    echo 'sed -i "s|</head>|<script src=\"/env-config.js\"></script></head>|" /app/dist/index.html.template' >> /app/entrypoint.sh && \
    echo 'cp /app/dist/index.html.template /app/dist/index.html' >> /app/entrypoint.sh && \
    echo 'echo "Environment variables configured:"' >> /app/entrypoint.sh && \
    echo 'echo "VITE_API_URL: $VITE_API_URL"' >> /app/entrypoint.sh && \
    echo 'echo "VITE_API_TOKEN: [hidden for security]"' >> /app/entrypoint.sh && \
    echo 'echo "VITE_TELEGRAM_BOT_TOKEN: [hidden for security]"' >> /app/entrypoint.sh && \
    echo 'echo "VITE_TELEGRAM_CHAT_ID: $VITE_TELEGRAM_CHAT_ID"' >> /app/entrypoint.sh && \
    echo 'exec npm run preview -- --host 0.0.0.0' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

EXPOSE 4173

ENTRYPOINT ["/app/entrypoint.sh"] 