FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN npm ci

COPY . .

ARG VITE_APP_TITLE="Цели и награды"
ARG VITE_APP_ID=goals
ARG VITE_GOALS_SERVICE_API=https://goals.melkor-apps.ru/api
ARG VITE_GOALS_AUTH_API=https://goals.melkor-apps.ru/auth
ARG VITE_APP_RELEASE

RUN npm run build

FROM nginx:stable-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
