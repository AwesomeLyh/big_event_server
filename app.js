const express = require("express");
const router = require("./router/user-router");
const mysql = require("mysql");
const joi = require("@hapi/joi");
//导入 cors 中间件
const cors = require("cors");

// 启动服务
const app = express();
app.listen(3000, (err) => {
  if (err) return console.log("Error");
  console.log("Server Running At Port 3000");
});

// 数据库连接实例
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "132456",
  database: "my_db",
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

//挂载路由
app.use("/api", router);

//捕获异常
app.use((err, rq, res, next) => {
  //数据校验不和法
  if (err instanceof joi.ValidationError) return res.cc(err);
  //未知错误
  res.cc(err);
});
