const db = require("../db/index");

const q_articles = "select * from ev_article_cate where is_ delete=0";
const q_artname = "select * from ev_article_cate where name=? or alias=?";
const i_article = "insert into ev_article_cate set ? ";
const d_artid = "update ev_article_cate set is_delete=1 where id=?";
const q_artid = "select * from ev_article_cate where  id =?";
const q_artidname = "select * from ev_article_cate where Id<>? and (name=? or alias=?)";
const u_atrid = "update ev_article_cate set? where id =?";

//获取文章分类
exports.getArticleCates = (req, res) => {
  db.query(q_articles, (err, result) => {
    if (err) return res.cc(err.message);
    res.send({
      status: 0,
      message: "获取文章分类列表成功！",
      data: result,
    });
  });
};

//新增文章分类
exports.addArticleCates = (req, res) => {
  db.query(q_artname, [req.body.name, req.body.alias], (err, result) => {
    if (err) return res.cc(err.message);
    if (result.length !== 0) return res.cc("文章类别已经存在");

    db.query(i_article, req.body, (err, result) => {
      if (err) return res.cc(err.message);
      if (result.affectedRows !== 1) return res.cc("新增文章分类失败，请重试");
      res.send({
        status: 0,
        message: "新增文章分类成功！",
      });
    });
  });
};

//根据id删除文章分类
exports.deleteCateById = (req, res) => {
  db.query(d_artid, req.params.id, (err, result) => {
    if (err) return res.cc(err.message);
    if (result.affectedRows !== 1) return res.cc("删除文章分类失败！");
    res.send({
      status: 0,
      message: "删除文章分类成功！",
    });
  });
};

//根据id获取文章分类
exports.getArtCateById = (req, res) => {
  db.query(q_artid, req.params.id, (err, result) => {
    if (err) return res.cc(err.message);
    if (result.length !== 1) return res.cc("获取文章分类失败！");
    res.send({
      status: 0,
      message: "获取文章分类成功！",
      data: result[0],
    });
  });
};

//根据id更新文章分类
exports.updateCateById = (req, res) => {
  db.query(q_artidname, [req.params.id, req.body.name, req.body.alias], (err, result) => {
    if (err) return res.cc(err.message);
    // 分类名称 和 分类别名 都被占用
    if (result.length === 2) return res.cc("分类名称与别名被占用，请更换后重试！");
    if (
      result.length === 1 &&
      result[0].name === req.body.name &&
      result[0].alias === req.body.alias
    )
      return res.cc("分类名称与别名被占用，请更换后重试！");
    // 分类名称 或 分类别名 被占用
    if (result.length === 1 && result[0].name === req.body.name)
      return res.cc("分类名称被占用，请更换后重试！");
    if (result.length === 1 && result[0].alias === req.body.alias)
      return res.cc("分类别名被占用，请更换后重试！");

    db.query(u_atrid, [req.body, req.body.id], (err, result) => {
      // 执行 SQL 语句失败s
      if (err) return res.cc(err);
      // SQL 语句执行成功，但是影响行数不等于 1
      if (result.affectedRows !== 1) return res.cc("更新文章分类失败！");
      // 更新文章分类成功
      res.cc("更新文章分类成功！", 0);
    });
  });
};
