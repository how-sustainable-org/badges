# Stage 1: Builder
FROM node:16-alpine AS builder
WORKDIR /app
COPY ./functions ./
RUN npm install
RUN npm run build

# Stage 2: Final
FROM node:16-alpine AS final
WORKDIR /app
COPY --from=builder /app/lib ./lib
COPY ./functions/assets ./assets
COPY ./functions/package.json .
COPY ./functions/package-lock.json .
RUN npm install --production
CMD [ "npm", "start" ]