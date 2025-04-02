FROM node:22

WORKDIR /totem-admin-front

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

RUN npm run build  # Ensure the frontend is built

EXPOSE 3000

CMD ["npm", "run", "start"]