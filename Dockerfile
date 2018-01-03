FROM golang:latest

RUN go get github.com/gorilla/mux

WORKDIR /todo

COPY . .

WORKDIR ./server
RUN go build

CMD ["./server"]