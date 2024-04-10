const { Router } = require("express")

//Importa o multer para manupular o upload
const multer = require("multer")
//Importa configurações do upload
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UsersAvatarController = require("../controllers/UsersAvatarController")

//Importa a função de verificação da autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()

//Inicializa o multer com suas configurações dentro de uma constante
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

usersRoutes.post("/", usersController.create)
//Chama a autenticação para fazer atualização. O id fica implicito na requisição, no UsersController
usersRoutes.put("/", ensureAuthenticated, usersController.update)
//Rota que insere o caminho do arquivo que será usado na aplicação
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
)

module.exports = usersRoutes
