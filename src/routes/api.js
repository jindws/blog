const Router = require("koa-router");
const Api = require("../controllers/api");

const router = Router({
    prefix:'/api'
});

router.post("/", Api.Index);

module.exports = router;
