FROM mhart/alpine-node:10
WORKDIR /usr/src/server
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN echo "nstar.dev.Dockerfile of node-starter building"
FROM mhart/alpine-node:base-10
WORKDIR /usr/src/server

COPY --from=0 /usr/src/server .
COPY .env ./
COPY .babelrc ./
COPY src/ ./src/ 

# Shares 60124 port with .prod
EXPOSE 9909
CMD ["yarn", "run", "dev:vanillaModule"]
