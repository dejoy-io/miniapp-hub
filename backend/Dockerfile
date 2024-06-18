FROM node:22.3.0-alpine3.19 AS base

FROM base AS dependencies
WORKDIR /backend
COPY package.json ./
RUN yarn install

FROM base AS build
WORKDIR /backend
COPY . .
COPY --from=dependencies /backend/node_modules ./node_modules
ENV NODE_ENV production
RUN yarn build
RUN yarn install --only=production && yarn cache clean --force

USER node

FROM base AS deploy
WORKDIR /backend
COPY --from=build /backend/dist/ ./dist/
COPY --from=build /backend/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
