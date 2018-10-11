const Router = require("koa-router");
const View = require("../controllers/view");

const router = Router();

router.get("/", View.Index);

router.get("/operate", View.Operate);
router.get("/operate/:id", View.Operate);

router.get("/detail/:id", View.Index);

router.get("/login", View.Index);


module.exports = router;
