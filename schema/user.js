const joi = require("@hapi/joi");
/*** string() 值必须是字符串
 * * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * * min(length) 最小长度 * max(length) 最大长度
 * * required() 值是必填项，不能为 undefined
 * * pattern(正则表达式) 值必须符合正则表达式的规则
 * */
const username = joi.string().alphanum().min(1).max(10).required();

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();
const avatar = joi.string().dataUri().required();
const art_name = joi.string().required();
const art_alias = joi.string().alphanum().required();
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow("");
const state = joi.string().valid("已发布", "草稿").required();

// 验证登陆表单数据的规则
module.exports.reg_login_scheme = {
  body: {
    username,
    password,
  },
};

// 验证更新用户信息数据的规则
module.exports.update_userinfo_scheme = {
  body: {
    id,
    nickname,
    email: user_email,
  },
};

// 验证更新用户密码数据的规则
module.exports.update_userpwd_scheme = {
  id,
  oldPwd: password,
  // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
  // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
  // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
  newPwd: joi.not(joi.ref("oldPwd")).concat(password),
};

// 验证更新用户头像数据的规则
module.exports.update_avatar_scheme = {
  avatar,
};

//验证新增文章l类别的表单数据校验
module.exports.insert_artilce_schme = {
  name: art_name,
  alias: art_alias,
};

//验证删除文章类别的表单数据校验
module.exports.delete_artilce_schme = {
  id,
};

//验证文章更新类别的表单数据校验
module.exports.update_cate_schema = {
  id,
  name: art_name,
  alias: art_alias,
};

//校验添加文章 的表达那数据校验
module.exports.add_article_schema = {
  title,
  cate_id,
  content,
  state,
};
