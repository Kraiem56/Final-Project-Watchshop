const express = require( "express");
const {
  authUser,
  deleteUser,
  getAllUsersByAdmin,
  getUserById,
  getUserProfile,
  registerUser,
  updateUserByAdmin,
  updateUserProfile,
} = require( "../controllers/userController.js");
const { protectRoute, admin } = require( "../middleware/authMiddleware.js");
const router = express.Router();

router.post("/login", authUser);
// router.get("/profile", protectRoute, getUserProfile);

router.post("/", registerUser);
router.get("/", protectRoute, admin, getAllUsersByAdmin);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

router
  .route("/:id")
  .delete(protectRoute, admin, deleteUser)
  .get(protectRoute, admin, getUserById)
  .put(protectRoute, admin, updateUserByAdmin);

module.exports =router;
