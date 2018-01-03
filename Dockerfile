FROM golang:latest

RUN go get github.com/gorilla/mux

COPY . .

WORKDIR ./server
RUN go build

CMD ["./server"]