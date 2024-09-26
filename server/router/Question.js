const express = require("express");
const router = express.Router();

const {createQuestion, getQuestions} = require('../controller/Question');

const {auth, isStudent, isAdmin} = require('../middlewares/Auth');

router.post("/create-question", createQuestion);
router.post("/get-question",  getQuestions);

module.exports = router