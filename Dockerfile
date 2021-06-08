FROM node:14.16.0-alpine

WORKDIR /zendesk-coding-challenge

ENV PATH /zendesk-coding-challenge/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . ./

CMD ["npm", "start"]