# Stage 1: Development stage
FROM node:18-alpine as development
WORKDIR /simson-ecom-admin-frontend


COPY package.json .
RUN npm install

COPY . .

# Stage 2: Build stage
FROM development as build

RUN npm run build

# Stage 3: Production stage
FROM node:18-alpine as production

WORKDIR /simson-ecom-admin-frontend


COPY --from=build /simson-ecom-admin-frontend/dist ./dist
COPY package.json .

#RUN npm install -g http-server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
#CMD ["npm", "start"]
