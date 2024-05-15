const express = require("express");
const router = express.Router();
const publicRoute = require("../routes/cuisines/PublicRoute");
const CuisineController = require("../controllers/CuisineController");

router.get("/", CuisineController.homePage);
router.use("/pub", publicRoute);

module.exports = router;
