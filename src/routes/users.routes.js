const { Router } = require("express")

const UsersController = require("../controllers/UsersController")

//Importa a função de verificação da autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
//Chama a autenticação para fazer atualização. O id fica implicito na requisição, no UsersController
usersRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRoutes
