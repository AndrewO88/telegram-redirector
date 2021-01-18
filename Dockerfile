WORKDIR /app

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
