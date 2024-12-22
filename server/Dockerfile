FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

<<<<<<< HEAD
# Exposez le port 3000
EXPOSE 4000
=======
EXPOSE 3000
>>>>>>> 186c6040f9c49636c83cdab29db3f0cb1f227eb7

CMD ["npm", "start"]
