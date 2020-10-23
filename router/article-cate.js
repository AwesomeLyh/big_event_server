const express = require("express");
const expressJoi = require("@escook/express-joi");

const handler = require("../router-handler/article-cate-handler.js");

const router = express.Router();

const { insert_artilce_schme } = require("../schema/user");
const { delete_artilce_schme } = require("../schema/user");
const { update_cate_schema } = require("../schema/user");

//获取文章分类
router.get("/cates", handler.getArticleCates);

//新增文章分类
router.post("/addcates", expressJoi(insert_artilce_schme), handler.addArticleCates);

//根据id删除文章分类
router.get("/deletecate/:id", expressJoi(delete_artilce_schme), handler.deleteCateById);

//根据id获取文章分类
router.get("/cates/:id", expressJoi(delete_artilce_schme), handler.getArtCateById);

//根据id更新文章分类
router.post("/updatecate", expressJoi(update_cate_schema), handler.updateCateById);

module.exports = router;
