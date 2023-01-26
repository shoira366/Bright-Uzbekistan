import { Router } from "express";

const route = Router();

import adminsController from "../controllers/admins.controller";
import rolesController from "../controllers/roles.controller";
import custom_functionsController from "../controllers/custom_functions.controller";
import regionsController from "../controllers/regions.controller";
import loginController from "../controllers/login.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import categoriesController from "../controllers/categories.controller";
import newsController from "../controllers/news.controller";

route
    // Login
    .post('/login', loginController.LOGIN)
    // .use(verifyToken)
    
	// Admins
    .get("/admins", adminsController.GET)
    .get('/admins/:id', adminsController.GET_BY_ID)
	.post("/admin", adminsController.POST)
    .put('/admin/:id', adminsController.PUT)
    .delete('/admin/:id', adminsController.DELETE)

	// Roles
    .get('/role/:id', rolesController.GET_BY_ID)
    .get('/roles', rolesController.GET)
	.post("/role", rolesController.POST)

    // Custom-Functions
    .get('/custom-functions', custom_functionsController.GET)
    .post('/custom-functions', custom_functionsController.POST)

    // Regions
    .get('/regions', regionsController.GET)
    .post('/regions', regionsController.POST)

    // Categories
    .get('/categories', categoriesController.GET)
    .post('/categories', categoriesController.POST)

    // News
    .get('/news/sort/:name', newsController.GET_SORTED)
    .get('/news', newsController.GET)
    .get('/news/:id', newsController.GET_BY_ADMIN)
    .post('/news', newsController.POST)
    .put('/news', newsController.SEND_TO_CHECK)
    .put('/news/confirmation', newsController.CONFIRM)
    .put('/news/:id', newsController.UPDATE_ONE)
    .delete('/news', newsController.DELETE)

export default route;
