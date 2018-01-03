FROM golang:latest

RUN go get github.com/gorilla/mux

WORKDIR /todo

COPY . .

WORKDIR ./server
RUN chmod +x start_server.sh

CMD ["sh", "./start_server.sh"]