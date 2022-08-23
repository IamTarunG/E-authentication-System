const express = require("express");
const router = express.Router();
const {
  getData,
  postData,
  updateData,
  deleteData,
} = require("../controllers/index.js");
const protect = require("../middleware/auth.js");
router.get("/", protect, getData);
router.post("/", protect, postData);
router.patch("/:id", protect, updateData);
router.delete("/:id", protect, deleteData);
module.exports = router;
