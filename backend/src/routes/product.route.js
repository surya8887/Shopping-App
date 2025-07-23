import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js"; // Fixed incorrect file extension

const router = Router();

// Route: /add-product
router.route("/add").post(
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Route: /remove-product
router.route("/remove").put(removeProduct);

// Route: /list-products
router.route("/list").get(listProduct);

// Route: /single-product
router.route("/single").post(singleProduct);

export default router;
