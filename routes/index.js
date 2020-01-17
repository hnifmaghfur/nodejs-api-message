const path = require('path');
const routes = require('express').Router();

routes.get('/', (req,res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

module.exports = routes;