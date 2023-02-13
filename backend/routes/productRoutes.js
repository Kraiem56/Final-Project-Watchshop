const express= require( "express");
const {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
}= require( "../controllers/productController.js");
const router = express.Router();
const { protectRoute, admin }= require( "../middleware/authMiddleware.js");

// router.get("/", getProducts);
router.route("/").get(getProducts).post(protectRoute, admin, createProduct);
router.route("/:id/reviews").post(protectRoute, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, admin, deleteProductById)
  .put(protectRoute, admin, updateProduct);

router.get("/top/product", getTopRatedProducts);
module.exports= router;
