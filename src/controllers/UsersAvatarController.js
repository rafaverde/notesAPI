//Conecta o banco de dados
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
//Importa DiskStorage pra poder manipular os arquivos
const DiskStorage = require("../providers/DiskStorage")

class UsersAvatarController {
  async update(request, response) {
    //Pega o usuario da request
    const user_id = request.user.id
    //Pega o nome do arquivo que o usuário fez upload
    const avatarFileName = request.file.filename

    //Instancia o diskStorage
    const diskStorage = new DiskStorage()

    //Busca na tabela de usuarios o usuario onde o id é igual ao user_id passado na requisição
    const user = await knex("users").where({ id: user_id }).first()

    //Verifica se o usuario existe e está conectado.
    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      )
    }

    //Verifica se o usuário já tem um avatar, se sim, precisamos apagar primeiro a imagem
    //existente para depois subir a nova, evitando muitas imagens sem uso no servidor.
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    //Caso não exista o avatar, salvamos o arquivo em upload, passando o nome dele.
    const filename = await diskStorage.saveFile(avatarFileName)

    //O caminho do arquivo é colocado na propriedade avatar do user
    user.avatar = filename
    //Atualizamos o user no banco de dados onde o id é correspondente
    //ao do user da requisição
    await knex("users").update(user).where({ id: user_id })

    //Retornamos os valores atualizados de user.
    return response.json(user)
  }
}

module.exports = UsersAvatarController
