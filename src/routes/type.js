const Router = require("koa-router");
const Type = require("../controllers/type");


const router = Router({
    prefix:'/api/type'
});

/**
 * @desc 新建文章
 * @post /api/type/list
}
 */
router.post("/list", Type.List);


module.exports = router;
