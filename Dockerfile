from node:lts-alpine as runtime
workdir /app

copy . .

run npm install
run npm run build

env HOST=0.0.0.0
env PORT=3000
env MODE=production

expose 3000

cmd npm run start