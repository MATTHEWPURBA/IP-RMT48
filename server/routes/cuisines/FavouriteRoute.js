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

const router = express.Router();

router.use(authentication);


router.post("/add-favorite", restaurantController.postCuisine);

router.put("/:id", authorization, restaurantController.updateCuisine);

router.delete("/:id", authorization, restaurantController.deleteCuisine);

router.patch("/:id/name", authorization, restaurantController.patchCuisineById);

router.patch("/:id/imageUrl", authorization, upload.single("image"), restaurantController.patchImage);
// router.patch("/:id/imgUrl", authorization, upload.single("avatar"), restaurantController.patchImgCuisineById);
module.exports = router;
