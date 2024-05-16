const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  /** multer ini berfungsi untuk mengubah file yang
   * di upload berubah menjadi buffer object (di dokumentasi multer npmjs)
   */
  storage: storage,
});

const restaurantController = require("../../controllers/RestaurantController");

const authentication = require("../../middleware/authentication");
const FavoriteController = require("../../controllers/FavoriteController");

const router = express.Router();

router.use(authentication);

router.post("/add-favorite/:id", FavoriteController.addtoFavorite);

module.exports = router;
