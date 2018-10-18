const Router = require("koa-router");
const fs = require('fs')
const path = require('path')
const router = Router();

const basename = path.basename(module.filename);
fs.readdirSync(__dirname)
.filter(file=> file.endsWith('.js') && file !== basename)
.forEach(function(file) {
	const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
});

module.exports = router;
