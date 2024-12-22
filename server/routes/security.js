const { Router } = require("express");
const checkAuth = require("../middlewares/checkAuth");  // Importation du middleware checkAuth

const router = new Router();

router.get("/profile", checkAuth, (req, res) => {
  res.json({
    message: "Bienvenue sur votre profil",
    user: req.user, 
  });
});

module.exports = router;
