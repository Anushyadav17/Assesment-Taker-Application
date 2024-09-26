const express = require("express");
const router = express.Router();

const {createResult, getResult} = require("../controller/Result");
const {auth} = require('../middlewares/Auth');

router.post("/create-result", createResult);
router.post("/get-result", getResult);

module.exports = router