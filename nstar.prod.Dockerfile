FROM mhart/alpine-node:10
WORKDIR /usr/src/server
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN echo "nstar.prod.Dockerfile of node-starter building"
FROM mhart/alpine-node:base-10
WORKDIR /usr/src/server

COPY --from=0 /usr/src/server .
COPY .env ./
COPY .babelrc ./
COPY src/ ./src/ 

EXPOSE 9909
CMD ["yarn", "run", "production:server"]
