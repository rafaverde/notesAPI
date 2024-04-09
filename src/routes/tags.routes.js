const { Router } = require("express")

const TagsController = require("../controllers/TagsController")
//Importa a função de verificação da autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes
