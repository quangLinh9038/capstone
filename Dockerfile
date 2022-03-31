FROM node:16-alpine3.14

ENV NODE_ENV=development

WORKDIR /trip-planner

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
