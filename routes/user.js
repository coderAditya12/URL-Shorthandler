const express = require("express");
const router = express.Router();
const {handle,handleLogin} = require('../controller/user')
router.post('/',handle)

router.post("/login", handleLogin);

module.exports = router;