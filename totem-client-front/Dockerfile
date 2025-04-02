FROM node:22

WORKDIR /totem-client-front

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build  # Build the React frontend
CMD ["npm", "run", "dev"]