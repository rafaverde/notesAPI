//Importa o axios
import axios from "axios"

//Exporta uma constante com o método axios de create e suas configurações em um objeto.
export const api = axios.create({
  baseURL: "http://localhost:3333",
})
