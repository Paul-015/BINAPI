const { Router } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Email ou mot de passe invalide" });
  }

  if (user.activated !== 1) {
    return res.status(403).json({ error: "Compte non activé. Veuillez activer votre compte." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ error: "Email ou mot de passe invalide" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET ?? "MyVeryVeryStrongSecret&IL1k31T", 
    { expiresIn: "1h" } 
  );

  res.json({
    token,
  });
});

module.exports = router;
