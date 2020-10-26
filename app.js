const express = require("express");
const joi = require("@hapi/joi");
const expressJWT = require("express-jwt");
const cors = require("cors");

const router = require("./router/user-router");
const router_info = require("./router/user-info-router");
const router_art_cate = require("./router/article-cate");
const router_art = require("./router/article");
const key = require("./router-handler/config");

// 启动服务
const app = express();
app.listen(3000, (err) => {
  if (err) return console.log("Error");
  console.log("Server Running At Port 3000");
});

// 将 cors 注册为全局中间件
app.use(cors());

//配置解析json
app.use(express.json());

// 配置解析表单数据的全局中间件
app.use(express.urlencoded({ extended: false }));

//挂载返回中间件
app.use((req, res, next) => {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//token解析
app.use(expressJWT({ secret: key.jwtSecretKey }).unless({ path: [/^\/api\//] }));

//挂载路由
app.use("/api", router);
app.use("/my", router_info);
app.use("/my/article", router_art_cate);
app.use("/my/article", router_art);

//挂载静态资源
app.use("/api/doc", express.static("./public"));
app.use("./upload", express.static("./upload"));

//捕获异常
app.use((err, rq, res, next) => {
  //表单数据校验
  if (err instanceof joi.ValidationError) return res.cc(err);
  //身份认证事变
  if (err.name == "UnauthorizedError") return res.cc("身份认证失败");
  //未知错误
  res.cc(err);
});
