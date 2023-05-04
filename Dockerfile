FROM golang:1.18.6

ENV GO111MODULE=on
ENV POSTGRES_CONNECTION_STRING="postgres://byfbpxur:4OnVDwNgvQO3j2eyvzRacHTM1kRCCxdf@lallah.db.elephantsql.com/byfbpxur"

RUN mkdir /app
WORKDIR /app

COPY go.mod . 
COPY go.sum .

# Get dependancies - will also be cached if we won't change mod/sum
RUN go mod download
# COPY the source code as the last step
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
RUN go build

ENTRYPOINT ["/app/pocket-caddie"]
