const Router = require("koa-router");

const view = require("./view");
const article = require("./article");
const admin = require("./admin");

const router = Router();

const routes = [
	view,
	article,
	admin,
];

for (let route of routes) {
	router.use(route.routes(), route.allowedMethods());
}

module.exports = router;
