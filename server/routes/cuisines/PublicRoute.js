const express = require("express");

const CuisineController = require("../../controllers/CuisineController");
const router = express.Router();

router.get("/cuisine", CuisineController.getCuisinesPublic);

module.exports = router;
