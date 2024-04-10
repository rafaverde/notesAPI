//Importa file-system do node
const fs = require("fs")
//Importa path, que resolve caminhos de diretórios
const path = require("path")
//Importa configurações do upload
const uploadConfig = require("../configs/upload")

//Classe com os métodos para salvar e deletar arquivos
class DiskStorage {
  //Função para salvar o arquivo na pasta de uploads, recebe como parametro o arquivo
  async saveFile(file) {
    //Pega o arquivo e coloca ele na pasta de uploads
    await fs.promises.rename(
      //Pasta e arquivo de origem que estão na pasta temporaria
      path.resolve(uploadConfig.TMP_FOLDER, file),
      //Move para a pasta uploads
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    //Retorna informações do arquivo
    return file
  }

  //Função para deletar o arquivo caso ele já exista ou o usuário deseje,
  //recebe como parametro o arquivo
  async deleteFile(file) {
    //Cria variável com o nome localização arquivo na pasta de uploads
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    //Trata busca para caso não exista o arquivo, não travar a aplicação
    try {
      //Verifica se existe o arquivo
      await fs.promises.stat(filePath)
    } catch {
      //Para aplicação caso tenha o erro
      return
    }

    //Deleta o arquivo
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
