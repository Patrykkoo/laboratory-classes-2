const express = require("express");
const router = express.Router();
const { getProcessLog } = require("../utils/logger");

router.get("/", (req, res) => {
    getProcessLog("Shutdown initiated");
    process.exit();
});

module.exports = router;