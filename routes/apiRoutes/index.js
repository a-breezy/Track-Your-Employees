const express = require("express");
const router = express.Router();

router.use(require("./employee"));
router.use(require("./role"));
router.use(require("./department"));

module.exports = router;
