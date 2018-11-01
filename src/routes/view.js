const Router = require("koa-router");
const View = require("../controllers/view");
const {checkLoginredirect} = require("../helpers/auth");

const router = Router();

router.get("/", View.Index);

router.get("/operate", View.Operate);
router.get("/operate/:id", View.Operate);

router.get("/detail/:id", View.Index);

router.get("/login", View.Index);

router.get("/type/:type", View.Index);

router.get("/my",checkLoginredirect, View.Index);

router.get("/search/:search", View.Index);

module.exports = router;
