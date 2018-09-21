const Router = require("koa-router");

const view = require("./view");
// const api = require("./api");

const router = Router();


const routes = [
	view,
	// api,
];

for (let route of routes) {
	router.use(route.routes(), route.allowedMethods());
}

module.exports = router;
