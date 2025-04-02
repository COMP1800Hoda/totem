# Stage 1: Build the React application
FROM node:lts-alpine as build

WORKDIR /totem-client-front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy the default nginx.conf provided by the docker image
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]