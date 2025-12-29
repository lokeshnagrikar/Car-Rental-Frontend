# Stage 1 — build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Pass build-time env vars as ARG and forward to npm build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

# Stage 2 — serve
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# Optional: custom nginx config to support SPA routing (rewrite to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



