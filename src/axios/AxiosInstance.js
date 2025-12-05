import axios from "axios";

let BASE_URL="http://localhost:5000/api"

const AxiosInstance=axios.create({
baseURL:BASE_URL
})



export default AxiosInstance

