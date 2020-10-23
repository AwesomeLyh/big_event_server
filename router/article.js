const express = require("express");
const expressJoi = require("@escook/express-joi");
const multer = require("multer");
const path = require("path");
const upload = multer({ dext: path.join(__dirname, "../upload") });
const handler = require("../router-handler/artlce-handler.js");
const { add_article_schema } = require("../schema/user");
const router = express.Router();

//新增文章
router.post(
  "/add",
  upload.single("cover_img"),
  expressJoi({ add_article_schema }),
  handler.addArticle
);

module.exports = router;
