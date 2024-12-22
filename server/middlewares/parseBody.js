module.exports = (req, res, next) => {
  // Ne rien faire si la méthode ne nécessite pas de corps
  if (!["POST", "PATCH"].includes(req.method)) return next();

  let data = "";

  // Accumule les données du corps de la requête
  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  // Lorsque la transmission est terminée
  req.on("end", () => {
    try {
      // Si le type de contenu est JSON, essaie de parser
      if (req.headers["content-type"]?.includes("application/json")) {
        if (data) {  // Vérifie qu'il y a des données à parser
          req.body = JSON.parse(data);
        } else {
          req.body = {};  // Requête JSON vide
        }
      } else {
        req.body = data || {};  // Autres types de contenu ou corps vide
      }
      next();
    } catch (error) {
      console.error("Erreur de parsing du corps de la requête :", error.message);
      error.statusCode = 400; 
      next(error);  // Passer l'erreur à l'error handler
    }
  });

  // Gestion des erreurs de transmission
  req.on("error", (error) => {
    console.error("Erreur lors de la lecture du corps de la requête :", error.message);
    error.statusCode = 500; 
    next(error);  // Passer l'erreur au middleware suivant
  });
};
