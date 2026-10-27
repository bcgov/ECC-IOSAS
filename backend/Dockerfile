FROM artifacts.developer.gov.bc.ca/docker-remote/node:22.23.4-alpine3.23

USER root
RUN mkdir -p /logs /opt/app-root/src \
  && chown -R node:0 /logs /opt/app-root/src \
  && chmod -R g+rwX /logs /opt/app-root/src

WORKDIR /opt/app-root/src
RUN ln -s /logs .

COPY --chown=node:0 package*.json ./
RUN npm ci

COPY --chown=node:0 . /opt/app-root/src
RUN chmod -R g+rwX /opt/app-root/src

USER node
EXPOSE 443 8080
CMD ["npm", "start"]
