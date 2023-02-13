const express =require( "express");
const {
  addOrderItems,
  getAllOrders,
  getLoggedInUserOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  deleteOrderAdmin,
} =require( "../controllers/orderController.js");
const { admin, protectRoute } =require( "../middleware/authMiddleware.js");
const router = express.Router();

router
  .route("/")
  .post(protectRoute, addOrderItems)
  .get(protectRoute, admin, getAllOrders);
router.route("/myorders").get(protectRoute, getLoggedInUserOrders);
router.route("/:id").get(protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);
router.route("/:id/deliver").put(protectRoute, updateOrderToDelivered);
router.route("/delete/:id").delete(protectRoute, admin, deleteOrderAdmin);


module.exports =router;
