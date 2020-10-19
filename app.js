const express = require("express");
const router = require("./router/user-router");
const mysql = require("mysql");

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

//挂载路由
app.use("/api", router);
