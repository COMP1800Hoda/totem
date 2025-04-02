FROM node:22

WORKDIR /totem-admin-front

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]