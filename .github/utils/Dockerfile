FROM nginx:latest

WORKDIR /app
COPY .github/utils/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/browser /app

EXPOSE 80
