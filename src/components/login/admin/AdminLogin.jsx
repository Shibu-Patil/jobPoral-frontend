import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { loginAdmin, registerAdmin } from "../../../slice/authSlice";
import Logo from "../../logo/Logo";

const AdminLogin = () => {
    const {loading} =useSelector(state=>state.auth)
  const naviage=useNavigate()
  const disptch=useDispatch()
  // console.log(loading);
  const [userData,setUserData]=useState({
    email:"",
    password:"",
    confirmPassword:"",
  })

  const handelChange=(e)=>{
    let {name,value}=e.target
    setUserData((preVal)=>({...preVal,[name]:value}))
  }
  const handelSubmit=async (e)=>{
    e.preventDefault()
    // console.log(userData);
    const {email,password}=userData
    const payload={email,password}
    console.log(payload);
    
    const data=await disptch(loginAdmin(payload))
    console.log(data);
    naviage("/admin-home")

    
  }
  
  const {email,password}=userData
  return (
<div className="size-full flex justify-center items-center">
      <form
        onSubmit={handelSubmit}
        className="w-1/3 h-[40%] flex justify-between max-lg:w-1/2 max-md:w-[80%] max-sm:w-[95%]"
      >
        <div className="size-full rounded-2xl shadow-2xl relative flex flex-col p-5 gap-6">
          
          {loading && (
            <div className="size-full absolute top-0 left-0 bg-white/40 flex justify-center items-center">
              <Logo className="scale-[3]" />
            </div>
          )}

          {!loading && (
            <>
              <h1 className="text-2xl font-bold flex justify-center">
                Admin Login
              </h1>

              <div
                className={`w-full min-h-10 border-b-2 px-2 relative group 
                focus-within:border-2 focus-within:rounded-md 
                ${email ? "border-2 rounded-md" : ""}`}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handelChange}
                  className="size-full outline-0"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-2 duration-100 group-focus-within:-top-2.5 
                    group-focus-within:bg-white group-focus-within:text-[12px] 
                    group-focus-within:px-1 
                    ${email ? "absolute bg-white -top-2.5 text-[12px] px-1" : "top-1"}`}
                >
                  Email
                </label>
              </div>

              <div
                className={`w-full min-h-10 border-b-2 px-2 relative group 
                focus-within:border-2 focus-within:rounded-md 
                ${password ? "border-2 rounded-md" : ""}`}
              >
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handelChange}
                  className="size-full outline-0"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-2 duration-100 group-focus-within:-top-2.5 
                    group-focus-within:bg-white group-focus-within:text-[12px] 
                    group-focus-within:px-1 
                    ${password ? "absolute bg-white -top-2.5 text-[12px] px-1" : "top-1"}`}
                >
                  Password
                </label>
              </div>

              <div className="w-full min-h-10">
                <button className="size-full bg-blue-900 text-white rounded-xl">
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default AdminLogin