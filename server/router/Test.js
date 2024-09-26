const express = require("express");
const router = express.Router();

const {auth, isAdmin} = require("../middlewares/Auth");
const {createTest, getAllTest, getTestDetails} = require("../controller/Test");

router.post("/create-test", auth,  createTest);
router.get("/get-alltest", getAllTest);
router.get("/get-testdetails", getTestDetails);

module.exports = router