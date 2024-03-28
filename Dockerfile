FROM golang:1.19

ENV GO111MODULE=on

RUN mkdir /app
WORKDIR /app

COPY go.mod . 
COPY go.sum .

# Get dependancies - will also be cached if we won't change mod/sum
RUN go mod download
# COPY the source code as the last step
COPY . .
#COPY .env .

ENV POSTGRES_CONNECTION_STRING=""
ENV TOKEN_HOUR_LIFESPAN=24
ENV API_SECRET=""

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
# RUN go build

ENTRYPOINT ["/app/pocket-caddie"]
