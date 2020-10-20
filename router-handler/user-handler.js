const db = require("../db/index");
const bcryptjs = require("bcryptjs");

const q_username = "SELECT * FROM ev_users WHERE username=?";
const i_user = "INSERT INTO ev_users set ?";

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

exports.login = (req, res) => {
  res.send("Login Success");
};
