const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/logincontroller.js');



// Rotas da home
// route.get('/', homeController.index);

route.get('/login/index', loginController.index);
route.post('/login/register',loginController.register)

module.exports = route;
