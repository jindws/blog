const Router = require("koa-router");

const view = require("./view");
const article = require("./article");

const router = Router({
	// prefix:'/api',
});


const routes = [
	view,
	article,
];

for (let route of routes) {
	router.use(route.routes(), route.allowedMethods());
}

module.exports = router;
