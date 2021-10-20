FROM node:14.16.1-alpine3.12

USER root
WORKDIR /home/KK-BV/Web

COPY . ${WORKDIR}

RUN apk update && \
    apk add git
RUN apk --no-cache add sudo
RUN yarn install --frozen-lockfile
RUN yarn run build

EXPOSE 3000 

CMD ["yarn", "run", "start"]