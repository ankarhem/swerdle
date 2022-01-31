### Build Step
# pull the Node.js Docker image
FROM node:16.2 as builder

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
# Change working directory
WORKDIR /usr/src/app
# Files required by pnpm install
COPY .npmrc package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .
# build the application
RUN pnpm build

EXPOSE 3000

# the command that starts our app
CMD ["node", "build/index.js"]