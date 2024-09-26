const express = require("express");
const router = express.Router();

const {signUp, login} = require('../controller/User');
const {getAllCount} = require("../controller/AllCount")


router.post("/login",login);
router.post("/signup",signUp);
router.post("/get-all-counts", getAllCount)

module.exports = router;