const db = require("../db/index");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config");

//sql
const q_username = "SELECT * FROM ev_users WHERE username=?";
const i_user = "INSERT INTO ev_users set ?";

//注册
exports.regUser = (req, res) => {
  const userInfo = req.body;
  //非空校验
  if (!userInfo.username || !userInfo.password) {
    return res.send({
      status: 1,
      message: "用户名及密码不能为空",
    });
  }

  //重复校验
  db.query(q_username, [userInfo.username], (err, result) => {
    if (err) {
      return res.send({ status: 1, message: err.message });
    }
    if (result.length > 0) {
      return res.send({ status: 1, message: "用户名已被占用" });
    }

    //添加数据
    db.query(i_user, userInfo, (err, reuslt) => {
      if (err) {
        return res.send({ status: 1, message: err.message });
      }
      //异常处理
      if (reuslt.affectedRows !== 1) {
        return res.send({ status: 1, message: "注册失败，请稍后重试" });
      }
      res.send({ status: 0, message: "注册成功" });
    });
  });

  //密码加密
  userInfo.password = bcryptjs.hashSync(userInfo.password, 10);
};

//登录
exports.login = (req, res) => {
  console.log("获取登录请求" + new Date());
  const userInfo = req.body;
  //非空校验
  if (!userInfo.username || !userInfo.password) {
    return res.cc("用户名及密码不能为空");
  }

  //查询用户名
  db.query(q_username, [userInfo.username], (err, result) => {
    if (err) {
      return res.cc(err.message);
    }
    if (result.length !== 1) {
      return res.cc("登录失败");
    }

    //比对输入和查询到的密码
    const compareResult = bcryptjs.compareSync(userInfo.password, result[0].password);
    console.log(compareResult);

    //登陆失败
    if (!compareResult) return res.cc("密码错误");

    //成功返回token
    const user = { ...result[0], password: "", user_pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};
