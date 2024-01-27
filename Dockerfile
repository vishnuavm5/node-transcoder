FROM node:20

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y ffmpeg

COPY package* .

RUN npm install

COPY .  .

CMD [ "node","index.js" ]

