const { Router } = require("express");
const userController = require("../controllers/users.js");

const router = Router();  // Correction ici

router.get("/users", userController.getAll);

router.post("/users", userController.create);

router.get("/users/:id", userController.getOne);

router.patch("/users/:id", userController.update);

router.delete("/users/:id", userController.delete);

module.exports = router;
