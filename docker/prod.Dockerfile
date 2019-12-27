# Stage 1 - build frontend app
FROM node:12-alpine as builder
WORKDIR '/app'

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - nginx & frontend dist
FROM nginx:stable-alpine
COPY config/nginx.conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html