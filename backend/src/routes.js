const express = require("express");

const CompanyController = require("./controllers/CompanyController");
const ProductsController = require("./controllers/ProductsController");
const StoresControllers = require("./controllers/StoresController");

const ProfileCompanyController = require("./controllers/ProfileCompanyController");
const SessionController = require("./controllers/SessionControler");

const routes = express.Router();

//ROTA DE SESSÃO
routes.post("/sessions", SessionController.create);

//ROTAS DE CRIAÇAO E DE LISTAGEM DAS COMPANYS.

routes.get("/companys", CompanyController.index);
routes.post("/companys", CompanyController.store);

//ROTAS DESTINADAS AOS PRODUCTS

routes.post("/products", ProductsController.create);
routes.get("/products", ProductsController.index);
routes.put("/products/:id", ProductsController.update);
routes.delete("/products/:id", ProductsController.delete);

//ROTAS DESTINADAS AS STORES

routes.post("/stores", StoresControllers.create);
routes.get("/stores", StoresControllers.index);
routes.put("/stores/:id", StoresControllers.update);
routes.delete("/stores/:id", StoresControllers.delete);

//ROTAS PARA 
routes.get("/profile", ProfileCompanyController.index);


module.exports = routes;
