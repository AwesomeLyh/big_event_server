const express = require("express");
const router = express.Router();
const handler = require("../router-handler/user-handler");
const expressJoi = require("@escook/express-joi");
const { reg_login_scheme } = require("../schema/user");
/**
 * @api {post} /api/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {int} status 请求是否成功，0：成功；1：失败
 * @apiSuccess {string} message 请求结果的描述消息
 * @apiSuccess {string} token 用于有权限接口的身份认证
 * @apiSuccessExample {json} Success-Response:
 *{
 * "status": 0,
 * "message": "登录成功！",
 * "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI"
 *}
 * @apiSampleRequest http://localhost:3000/api/login
 * @apiVersion 1.0.0
 */
router.post("/login", expressJoi(reg_login_scheme), handler.login);

router.post("/register", expressJoi(reg_login_scheme), handler.regUser);

module.exports = router;
