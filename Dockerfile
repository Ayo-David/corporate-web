# production environment
FROM nginxinc/nginx-unprivileged:1.21-alpine
USER root
RUN apk -U upgrade
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
EXPOSE 8080
USER nginx
CMD ["nginx", "-g", "daemon off;"]
