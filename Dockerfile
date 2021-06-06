FROM node:14
RUN mkdir -p /home/node/app/node_modules 

WORKDIR /home/node/app
COPY package*.json .



EXPOSE 5000



