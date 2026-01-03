import React, { useState } from 'react'
import Profile from './profile/Profile'
import Companies from './companies/Companies'

const Home = () => {
    const [showProfile,setShowProfile]=useState(false)
    const handelProfileSHow=(e)=>{
        e.stopPropagation()
        setShowProfile(true)
    }
        const handelProfiledDontSHow=(e)=>{
            e.stopPropagation()
        setShowProfile(false)
    }

    // console.log(showProfile);sttsthythht
    
  return (
<div className=' size-full flex relative'>
    <div className={`w-1/5  min-w-[300px] fixed h-full -left-[260px] hover:left-0 duration-150 ${showProfile?"left-0":""}`} onMouseEnter={handelProfileSHow} onMouseLeave={handelProfiledDontSHow} onClick={handelProfileSHow}>
        <Profile handelProfiledDontSHow={handelProfiledDontSHow}></Profile>
    </div>
    <div className={` grow overflow-y-scroll duration-150 ${showProfile?"ml-[310px]":"ml-[30px]"}`}>
        <Companies></Companies>
    </div>
</div>
  )
}

export default Home