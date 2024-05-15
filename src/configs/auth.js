//Um objeto já é exportado com as configurações do jwt.
module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "1d",
  },
}
