import AxiosInstance from "../axios/AxiosInstance"

const service = {
    registerUser:async(payload)=>{
        let res=await  AxiosInstance.post("/users/register",payload)
        return res
    },
        verifyUser:async(payload)=>{
        let res=await  AxiosInstance.post("/users/verify-otp",payload)
        return res
    },
      loginUser:async(payload)=>{
        let res=await  AxiosInstance.post("/users/login",payload)
        return res
    },getCompanies:async()=>{
        let res = await AxiosInstance.get("/companies")
        return res
    },    registerAdmin:async(payload)=>{
        let res=await  AxiosInstance.post("/admin/register",payload)
        return res
    },
       loginAdmin:async(payload)=>{
        let res=await  AxiosInstance.post("/admin/login",payload)
        return res
    },applyCompanies: async (payload,token) => {
            let res = await AxiosInstance.post(
    "/companies/apply",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res;
},createCompanies: async (payload,token) => {
            let res = await AxiosInstance.post(
    "/companies",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res;
}
}


export default service