const Router = require("koa-router");
const Admin = require("../controllers/admin");

const router = Router({
    prefix:'/api/admin'
});


/**
 * @desc 新建用户
 * @post /api/admin/create
 * @param {
    title:String,
    content:String,
}
 */
router.post("/create", Admin.Create);


/**
 * @desc 登录
 * @post /api/admin/login
 * @param id:String
 */
router.post("/login", Admin.Login);

/**
 * @desc 登出
 * @post /api/admin/logout
 */
router.post("/logout", Admin.Logout);


/**
 * @desc 用户信息
 * @post /api/admin/message
 */
router.post("/message", Admin.Message);

module.exports = router;
