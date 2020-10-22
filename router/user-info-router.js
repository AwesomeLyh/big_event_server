const express = require("express");
const router = express.Router();
const { update_userinfo_scheme } = require("../schema/user");
const { update_userpwd_scheme } = require("../schema/user");
const { update_avatar_scheme } = require("../schema/user");
const expressJoi = require("@escook/express-joi");

const handler = require("../router-handler/user-info-handler");

//获取用户信息
router.get("/userinfo", handler.getInfo);

// 更新用户信息
router.post(
  "/userinfo",
  expressJoi(update_userinfo_scheme),
  handler.updateUserInfo
);

// 修改密码
router.post(
  "/updatepwd",
  expressJoi(update_userpwd_scheme),
  handler.updaeUserpwd
);

//修改头像
router.post(
  "/updateavatar",
  expressJoi(update_avatar_scheme),
  handler.updateAvatar
);

module.exports = router;
