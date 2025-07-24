import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt, onlyAdmin } from "../middlewares/auth.middleware.js";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Route: POST /products/add
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  verifyjwt,
  onlyAdmin,
  addProduct
);

// Route: DELETE /products/remove/:id
router.delete("/remove/:id", verifyjwt, onlyAdmin, removeProduct);

// Route: GET /products/list
router.get("/list", listProduct);

// Route: GET /products/single/:id
router.get("/single/:id", singleProduct);

export default router;
