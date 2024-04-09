//Conecta com a biblioteca do knex e com nosso tratamento de erros
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
//Puxa a função de comparação do bcrypt para comparar as senhas.
const { compare } = require("bcryptjs")

//Importa a configuração de autenticação para o jwt
const authConfig = require("../configs/auth")

//Importa método de signin do jwt
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    //Conecta com a tabela users e encontra o usuário que tem o email da requisição
    //e pega apenas o primeiro, sendo que não pode haver dois usuários com mesmo email.
    const user = await knex("users").where({ email }).first()

    //Confere e trata o erro se o usuário não existe
    if (!user) {
      throw new AppError("Email e/ou senha incorreta", 401)
    }

    //Cria uma variável que vai conter a comparação entre o que foi digitado na senha e a senha que está cadastrada no usuário da tabela armazenada na variável user.
    const passwordMatch = await compare(password, user.password)

    //Confere se a senha digitada está correta e trata o erro se não estiver
    if (!passwordMatch) {
      throw new AppError("Email e/ou senha incorreta", 401)
    }

    //Desestrutura e aloca as propriedades do objeto jwt no auth.js nas variavéis
    const { secret, expiresIn } = authConfig.jwt

    //Cria o token usando o método sign do jwt passando um novo objeto vazio, o secret e outro objeto com as outras informações, subject com o user id e a expiração.
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    //Retorna objeto json com user e token
    return response.json({ user, token })
  }
}

module.exports = SessionsController
