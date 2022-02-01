### Build Step
# pull the Node.js Docker image
FROM node:fermium-alpine3.15 as builder
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Install build dependencies
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .
# build the application
RUN pnpm build


FROM node:fermium-alpine3.15
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Install production dependencies
COPY --from=builder /usr/src/app/.npmrc /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /usr/src/app/build ./build

RUN mkdir -p /usr/src/app/db

EXPOSE 3000

# the command that starts our app
CMD ["node", "/usr/src/app/build/index.js"]