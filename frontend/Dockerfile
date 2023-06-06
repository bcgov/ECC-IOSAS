FROM registry.access.redhat.com/ubi8/nodejs-18:1 as build-stage
ENV HOME_CLIENT /opt/app-root/src/app
USER root
RUN mkdir -p ${HOME_CLIENT}
WORKDIR ${HOME_CLIENT}

COPY package*.json ./
RUN chown -R 1008111001 ${HOME_CLIENT}
USER 1008111001
RUN npm set progress=false && npm ci --no-cache
COPY ./ .
RUN INLINE_RUNTIME_CHUNK=false npm run build

FROM registry.access.redhat.com/ubi8/nodejs-18:1 as caddy-stage
ENV HOME_CLIENT /opt/app-root/src/app
USER root
RUN mkdir -p ${HOME_CLIENT}
RUN chown -R root ${HOME_CLIENT}
EXPOSE 2015
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build-stage /opt/app-root/src/app/dist /srv
