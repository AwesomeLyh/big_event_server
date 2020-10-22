const db = require("../db/index");
const bcryptjs = require("bcryptjs");
const q_uinfo =
  "select id, username, nickname, email, user_pic from ev_users where id=?";
const u_uinfo = "update ev_users set ? where id = ?";
const q_user = "select * from ev_users where id= ?";
const u_upwd = "update ev_users set password=? where id= ?";
const u_uavatar = "update ev_users set user_pic=? where id= ?";

//获取用户信息
exports.getInfo = (req, res) => {
  db.query(q_uinfo, req.user.id, (err, result) => {
    //1 .sql执行失败
    if (err) return res.cc(err.message);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (result.length !== 1) return res.cc("获取用户信息失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: result[0],
    });
  });
};

//更新用户信息
exports.updateUserInfo = (req, res) => {
  db.query(u_uinfo, [req.body, req.body.id], (err, result) => {
    //1 .sql执行失败
    if (err) return res.cc(err.message);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (result.affectedRows !== 1) return res.cc("更新用户信息失败");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: result[0],
    });
  });
};

//修改密码
exports.updaeUserpwd = (req, res) => {
  db.query(q_user, req.body.id, (err, result) => {
    //1 .sql执行失败
    if (err) return res.cc(err.message);
    //2.未查询到该用户
    if (result.length !== 1) return res.cc("获取用户信息失败！,请重试");
    // 用户输入的旧密码和存储的密码对比
    const compareResult = bcryptjs.compareSync(
      req.body.oldPwd,
      result[0].password
    );
    if (!compareResult) return res.cc("原密码错误");
    //加密新密码
    let newPwd = bcryptjs.hashSync(req.body.newPwd, 10);
    //存储
    db.query(u_upwd, [newPwd, req.body.id], (err, result) => {
      //1 .sql执行失败
      if (err) return res.cc(err.message);
      //2.未查询到该用户
      if (result.affectedRows !== 1) return res.cc("修改密码失败！,请重试");
      res.cc("修改成功", 0);
    });
  });
};

//更新头像
exports.updateAvatar = (req, res) => {
  db.query(u_uavatar, [req.body.avatar, req.body.id], (err, result) => {
    //1 .sql执行失败
    if (err) return res.cc(err.message);
    //2.未查询到该用户
    if (result.affectedRows !== 1) return res.cc("更新头像失败！,请重试");
    res.cc("修改头像成功", 0);
  });
};
