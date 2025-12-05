import AxiosInstance from "../axios/AxiosInstance"

const service = {
    registerUser:async(payload)=>{
        let res=await  AxiosInstance.post("/register",payload)
        return res
    }
}


export default service