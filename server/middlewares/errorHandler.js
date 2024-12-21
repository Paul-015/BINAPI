module.exports = (err, req, res, next) => {
    console.error("Erreur détectée :", err.message);
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Erreur interne du serveur";
  
    res.status(statusCode).json({ error: message });
  };
  