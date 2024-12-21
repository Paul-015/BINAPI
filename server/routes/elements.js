const { Router } = require("express");
const elementsController = require("../controllers/elementsControl.js"); // Assurez-vous que le nom est correct
const checkAuth = require("../middlewares/checkAuth.js");

const router = new Router();

router.get("/elements", elementsController.getAll); // getAll
router.post("/elements", elementsController.create); // create
router.get("/elements/:id", elementsController.getOne); // getOne
router.patch("/elements/:id", elementsController.update); // update
router.delete("/elements/:id", elementsController.delete); // delete

module.exports = router;
