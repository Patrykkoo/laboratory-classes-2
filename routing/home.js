const express = require("express");
const router = express.Router();
const { getProcessLog } = require("../utils/logger");

router.get("/" , (req, res) => {
  getProcessLog("Server shutting down");
  process.exit();
});

module.exports = router;