const { Router } = require("express")

const NotesController = require("../controllers/NotesController")
//Importa a função de verificação da autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

//Antes de chamar as rotas, usamos o middleware de autenticação pra qualquer uso que seja feito
notesRoutes.use(ensureAuthenticated)

notesRoutes.get("/", notesController.index)
notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes
