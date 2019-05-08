FROM janes/alpine-lamp

WORKDIR /www
COPY build .

EXPOSE 80/tcp
