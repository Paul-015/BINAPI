FROM node:18

# Créez un répertoire pour l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers
COPY . .

# Exposez le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
