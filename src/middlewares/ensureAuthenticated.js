//Importa função do jwt para verificação
const { verify } = require("jsonwebtoken")

const AppError = require("../utils/AppError")

//Importa configurações da nossa autenticação
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  //Obtem o cabeçalho do token com a autorização, onde está o token do usuário
  const authHeader = request.headers.authorization

  //Verifica se existe o cabeçalho da requisição e lança exceções
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401)
  }

  //Caso ele exista, vamos alocar em um vetor o que tem dentro do header
  //Lá dentro ele é armazenado em umm strig que vamos recortar em dois objetos, onde há o espaço dentro do vetor em que o primeiro será ignorado. Exemplo do token no header: "Bare xxxxxxxxxxxxx"
  const [, token] = authHeader.split(" ")

  //Tratamento de exceção para validar o token
  try {
    //Verifica com as configurações do JWT se o token bate com o secret
    //Devolve desestruturado um "sub" que faz parte do verify, que daremos o apelido semântico (alias) para user_id.
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    //Pega a requisição e cria uma propriedade user, com uma propriedade no formato número puxando o valor de user_id

    request.user = {
      id: Number(user_id),
    }

    //Se tudo estiver ok, chama a próxima função que o middlware interceptou
    return next()
  } catch {
    //Caso o token seja inválido, trata-se o erro
    throw new AppError("JWT Token inválido", 401)
  }
}

module.exports = ensureAuthenticated
