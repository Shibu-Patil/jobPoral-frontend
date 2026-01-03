import axios from "axios";

let BASE_URL="https://jobportal-cmlg.onrender.com/api"

const AxiosInstance=axios.create({
baseURL:BASE_URL
})



export default AxiosInstance

