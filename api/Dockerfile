FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]

# FROM ubuntu:16.04 as golden

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Grab binary from build image
# COPY --from=builder /tmp/build/packages/$PACKAGE_PATH/bin/turbine-engine-linux /usr/src/app/
