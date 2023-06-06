FROM registry.access.redhat.com/ubi8/nodejs-18:1 as build-stage
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM registry.access.redhat.com/ubi8/nodejs-18:1 as caddy-stage

EXPOSE 2015
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build-stage /frontend/dist /srv
