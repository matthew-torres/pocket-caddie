# pocket-caddie

Backend
- The backend can be run in two separate ways. 
    1. go build && ./pocke-caddie in main directory
    OR
    2. docker build -t pocket-caddie:1.<version-number> .
     docker run -d -p 8080:8080 pocket-caddie:1.<version-number>

Frontend
- 1. npm run dev in /webapp

***Must update .env file to include DB secret string