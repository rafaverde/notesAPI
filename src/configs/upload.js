//Importa módulo que resolve caminho de diretório
const path = require("path")
//Importa biblioteca para fazer uploads, multer
const multer = require("multer")
//Biblioteca para gerar um hash no nome do arquivo
const crypto = require("crypto")

//Aloca caminho da pasta temporária em uma variável usando método path do Node
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")

//Aloca caminho da pasta de uploads em uma variável usando método path do Node
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

//Configurações do multer para definir o nome do arquivo
//O arquivo vai para a pasta tmp, é criado um hash para não repetir os nomes
//dos arquivos e a junção dele com o original gera o nome do arquivo.
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
