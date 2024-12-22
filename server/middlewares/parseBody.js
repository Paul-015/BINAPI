module.exports = (req, res, next) => {
  if (!["POST", "PATCH"].includes(req.method)) return next();

  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    try {
      if (req.headers["content-type"]?.includes("application/json")) {
        if (data) {  
          req.body = JSON.parse(data);
        } else {
          req.body = {};  // Requête JSON vide
        }
      } else {
        req.body = data || {};  
      }
      next();
    } catch (error) {
      console.error("Erreur de parsing du corps de la requête :", error.message);
      error.statusCode = 400; 
      next(error);  
    }
  });

  req.on("error", (error) => {
    console.error("Erreur lors de la lecture du corps de la requête :", error.message);
    error.statusCode = 500; 
    next(error);  
  });
};
