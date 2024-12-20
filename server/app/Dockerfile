FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
