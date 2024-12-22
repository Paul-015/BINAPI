const { Router } = require("express");
const elementsController = require("../controllers/elementsControl.js"); // Assurez-vous que le nom est correct
const checkAuth = require("../middlewares/checkAuth.js");

const router = new Router();

router.get("/elements", elementsController.getAll); 
router.post("/elements", elementsController.create); 
router.get("/elements/:id", elementsController.getOne); 
router.patch("/elements/:id", elementsController.update); 
router.delete("/elements/:id", elementsController.delete); 

module.exports = router;
