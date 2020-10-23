const db = require("../db/index");
const path = require("path");

const i_art = "insert into ev_articles set ?";

//添加文章的hanfler
exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== "cover_img")
    return res.cc("必须选择一个文章封面");

  const articleInfo = {
    ...req.body,
    cover_img: path.join("/upload", req.file.fieldname),
    pub_date: new Date(),
    author_id: req.user.id,
    is_delete: 0,
  };
  db.query(i_art, articleInfo, (err, result) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (result.affectedRows !== 1) return res.cc("发布文章失败！");
    res.cc("文章发布成功", 0);
  });
};
