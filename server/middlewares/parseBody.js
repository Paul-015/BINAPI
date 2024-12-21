module.exports = (req, res, next) => {
    if (!["POST", "PATCH"].includes(req.method)) return next();
  
    let data = "";
  
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
  
    req.on("end", () => {
      try {
        if (req.headers["content-type"]?.includes("application/json")) {
          req.body = JSON.parse(data);
        } else {
          req.body = data; 
        }
      } catch (error) {
        console.error("Erreur de parsing du corps de la requête :", error.message);
        return res.status(400).json({ message: "Données JSON invalides" });
      }
  
      next();
    });
  
    req.on("error", (error) => {
      console.error("Erreur lors de la lecture du corps de la requête :", error.message);
      return res.status(500).json({ message: "Erreur serveur lors de la lecture des données" });
    });
  };