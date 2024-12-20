const express = require("express");
const mysql2 = require("mysql2");
require("dotenv").config();  

const app = express();
app.use(express.json());  


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT 
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

app.get("/", (req, res) => {
  res.send("Hello World! L'application fonctionne.");
});

const port = process.env.PORT;
if (!port) {
  throw new Error("La variable d'environnement PORT doit être définie.");
}

app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
