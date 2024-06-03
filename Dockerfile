FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package*.json ./

# Not working 
# RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" , "start" ]