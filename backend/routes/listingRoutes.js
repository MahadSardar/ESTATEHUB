import express from "express";
import {
  createListing,
  getMyListings,
  updateListing,
  deleteListing,
  changeStatus,
  deleteMedia,
  setCover,
} from "../controllers/listingController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.array("media", 10), createListing);
router.get("/my", protect, getMyListings);
router.put("/:id", protect, upload.array("media", 10), updateListing);
router.delete("/:id", protect, deleteListing);
router.patch("/:id/status", protect, changeStatus);
router.delete("/:id/media/:mediaId", protect, deleteMedia);
router.patch("/:id/media/:mediaId/cover", protect, setCover);

export default router;