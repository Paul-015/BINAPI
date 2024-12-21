const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const elementsController = require("../controllers/elementsController");

// Routes d'authentification
router.post("/register", authController.register);
router.post("/login", authController.login);

// Routes des éléments protégées par authentification
router.get("/elements", authController.authenticate, elementsController.getAllElements);
router.get("/elements/:id", authController.authenticate, elementsController.getElementById);
router.post("/elements", authController.authenticate, elementsController.createElement);
router.put("/elements/:id", authController.authenticate, elementsController.updateElement);
router.delete("/elements/:id", authController.authenticate, elementsController.deleteElement);

module.exports = router;
