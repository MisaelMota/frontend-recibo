import axios from "axios"

const dataConexion=axios.create({
    baseURL: "http://localhost:3060"
})

export default dataConexion