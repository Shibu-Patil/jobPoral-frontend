import React, { useState } from 'react'
import Logo from '../logo/Logo'
import { useDispatch, useSelector } from 'react-redux'
import DropDown from './DropDown'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../slice/authSlice'
import { validatePassword } from "val-pass";
import toast from 'react-hot-toast'



const Register = () => {

  const {loading} =useSelector(state=>state.auth)
  const naviage=useNavigate()
  const disptch=useDispatch()
  // console.log(loading);
  const [userData,setUserData]=useState({
    name:"",
    email:"",
    mobile:"",
    yearOfPassout:"",
    password:"",
    confirmPassword:"",
    college:"",
    joinedInstitute:"",
    instituteName:"",
    skills:[],
    positionApplyingFor:[]
  })
  const [passwordError, setPasswordError] = useState("");
const [confirmError, setConfirmError] = useState(false);

const handelChange = (e) => {
  let { name, value } = e.target;

  // 🔐 Password validation
  if (name === "password") {
    const { validateAll,getAllValidationErrorMessage } = validatePassword(value, 8);
    const errorMsg =!validateAll() && getAllValidationErrorMessage();
    setPasswordError(value ? errorMsg : "");

    // reset confirm password error when password changes
    if (userData.confirmPassword && value !== userData.confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  }

  // 🔁 Confirm password validation
  if (name === "confirmPassword") {
    if (value && value !== userData.password) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  }

  setUserData((preVal) => ({
    ...preVal,
    [name]: value,
  }));
};

  const handelSubmit=async (e)=>{
    e.preventDefault()
    // console.log(userData);
    const {email,mobile,password,positionApplyingFor,skills,yearOfPassout,joinedInstitute,instituteName,college,name}=userData
    const payload={
      name,email,mobile,password,positionApplyingFor:positionApplyingFor.join(),skills,yearOfPassout,joinedInstitute,instituteName,college
    }
    // console.log(payload);
    const { validateAll } = validatePassword(password, 8);

if (!validateAll()) {
  return;
}

if (password !== confirmPassword) {
  toast.error("password and confirm password does not match")
  return;
}
    
    try {
      const data=await disptch(registerUser(payload))
    console.log(data);
    if(data.meta.requestStatus=="fulfilled"){
          
    naviage("/verify-otp",{state:{
      email,
      userId:data.payload.userId
    }})
    
    }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const {name,email,mobile,yearOfPassout,password,confirmPassword,college,joinedInstitute,instituteName}=userData
  return (
    <div className='size-full flex justify-center items-center'>
      <form action="" className='w-1/3 h-[90%] flex justify-between max-lg:w-1/2 max-md:w-2/3 max-sm:w-[95%]' onSubmit={handelSubmit}>
        <div className='size-full rounded-2xl shadow-2xl relative flex flex-col p-5 gap-6 overflow-y-scroll'>
         {
          loading&&<div className='size-full flex justify-center items-center absolute opacity-40'>
            <Logo className="scale-[3]"></Logo>
          </div>
         } 
          {
            !loading && <>
            
            <div className='w-full min-h-10  justify-center items-center'>
                <h1 className='text-2xl font-bold flex justify-center items-center'>Register</h1>
          </div>

          <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${name? "border-2 rounded-md":""}`}>
            <input type="text"  id='name'  className='size-full outline-0 ' name='name' value={name} onChange={handelChange}/>
            <label htmlFor="email" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${name?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Name</label>
          </div> 


          <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${email? "border-2 rounded-md":""}`}>
            <input type="email"  id='email'  className='size-full outline-0 ' name='email' value={email} onChange={handelChange}/>
            <label htmlFor="email" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${email?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Email</label>
          </div> 

           <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${mobile? "border-2 rounded-md":""}`}>
            <input type="text"  id='mobile'  className='size-full outline-0 ' name='mobile' value={mobile} onChange={handelChange}/>
            <label htmlFor="mobile" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${mobile?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Mobile</label>
          </div> 

            <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${yearOfPassout? "border-2 rounded-md":""}`}>
              <input type="text"  id='yearOfPassout'  className='size-full outline-0 ' name='yearOfPassout' value={yearOfPassout} onChange={handelChange}/>
              <label htmlFor="yearOfPassout" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${yearOfPassout?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Year Of Passout</label>
          </div> 
          {/* <div className='w-full border-b-2 p-2'>
            <label htmlFor="">Skills</label>
            <div className='flex w-full justify-around'>
              <div className='flex gap-1'>
                <input type="checkbox" />
                <span>HTML</span>
              </div>
              
              <div className='flex gap-1'>
                <input type="checkbox" />
                 <span>CSS</span>
                </div>
             <div className='flex gap-1'>
                <input type="checkbox" />
                 <span>JS</span>
                </div>
             <div className='flex gap-1'>
                <input type="checkbox" />
                 <span>REACT</span>
                </div>
            </div>

            
          </div> */}
          <div className='w-full min-h-10'>
            <DropDown values={["HTML","CSS","JS","React","JAVA","SPRING","SPRING BOOT","SELENIUM","MANUAL TESTING","API TESTING","PYTHON","FLASK","DJANGO","DATA SCIENCE","DATA ANALYSIS","POWER BI","SQL","MONGO DB","DSA"]} feildName="Select Skills" userData={userData} setUserData={setUserData} feild="skills"></DropDown>
          </div>

          <div className='w-full min-h-10'>
            <DropDown values={["development","testing"]} feildName="Position Applying For" userData={userData} setUserData={setUserData} feild="positionApplyingFor"></DropDown>
          </div>

           {/* <div className={`relative w-full min-h-10 flex justify-start  items-center border-b-2 px-2 group focus-within:border-2 focus-within:rounded-md ${joinedInstitute?"border-2 rounded-md":""} max-md:flex-col`} onChange={handelChange}>
            <label htmlFor="" className={`absolute  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${joinedInstitute?"-top-2.5 bg-white text-[12px] px-1":""}` }>Joined Any Institute</label>
            <div className={`flex gap-10 group-focus-within:px-1 ${joinedInstitute?"px-1":"pl-60 "} `}>
             <div>
               <input type="radio" name='joinedInstitute' value="yes"/> Yes
             </div>
              <div>
                <input type="radio" name='joinedInstitute' value="no"/> No
              </div>
            </div>
            
          </div>  */}

          <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${joinedInstitute? "border-2 rounded-md":""}`} onChange={handelChange}>
                        <label htmlFor="email" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${joinedInstitute?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Joined Institute</label>
            <select name="joinedInstitute" id="" className='size-full outline-0'>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

            {
              joinedInstitute=="yes" && 
          <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${instituteName? "border-2 rounded-md":""}`}>
            <input type="text"  id='instituteName'  className='size-full outline-0 ' name='instituteName' value={instituteName} onChange={handelChange}/>
            <label htmlFor="instituteName" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${instituteName?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Institute Name</label>
          </div> 
            }

          <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${college? "border-2 rounded-md":""}`}>
            <input type="text"  id='college'  className='size-full outline-0 ' name='college' value={college} onChange={handelChange}/>
            <label htmlFor="college" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${college?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>college</label>
          </div> 

           <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${password? "border-2 rounded-md":""}`}>
            <input type="password"  id='password'  className='size-full outline-0 ' name='password' value={password} onChange={handelChange}/>
            <label htmlFor="password" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${password?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Password</label>
          </div> 

          {passwordError && (
  <p className="text-red-500 text-sm">{passwordError}</p>
)}

           <div className={`w-full min-h-10  justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${confirmPassword? "border-2 rounded-md":""} ${!confirmError?"border-black":"border-red-500"}`}>
            <input type="password"  id='confirmPassword'  className='size-full outline-0 ' name='confirmPassword' value={confirmPassword} onChange={handelChange}/>
            <label htmlFor="confirmPassword" className={`absolute left-2  duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white  group-focus-within:text-[12px] group-focus-within:px-1 ${confirmPassword?"absolute bg-white -top-2.5 text-[12px] px-1":"top-1"}`}>Confirm Password</label>
          </div> 


            <div className='w-full min-h-10'>
              <button className='size-full bg-blue-950 text-white rounded-xl'>
                Click
              </button>
            </div>

            </>
          }
        </div>
      </form>
    </div>
  )
}

export default Register