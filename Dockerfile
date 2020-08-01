# Stage 1 - the build process
FROM node:12 as build-deps
EXPOSE 3000
WORKDIR /usr/src/app
RUN npm i -g serve
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
COPY . ./
RUN npm run build

# Stage 2 - serving the build files using npm serve package
# instead of using nginx
CMD ["serve", "-l", "tcp://0.0.0.0:3000", "./build"]

# Stage 2 - the production environment
# FROM nginx:1.18.0-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]