import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allCompanies, applyCompanies } from '../../../slice/authSlice'
import { IoClose } from "react-icons/io5";

const Companies = () => {
  const dispatch = useDispatch()
  const { companies, user } = useSelector((state) => state.auth)
  const [viewedComapany,setViewedCompany]=useState(null)

  useEffect(() => {
    dispatch(allCompanies())
  }, [dispatch])

  const handelClickView=(ele)=>{
    setViewedCompany(ele)
  }  

  const handelClickCloseView=(ele)=>{
    setViewedCompany(null)
  }  

  // Check if user has applied to a company
  const hasApplied = (companyId) => {
    return user?.appliedCompanies?.some(c => c._id === companyId)
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold text-slate-700">No Companies Yet</p>
      </div>
    )
  }

  const handelClick=async()=>{
    try {
      await dispatch(
        applyCompanies({ companyId: viewedComapany._id })
      ).unwrap();

      // open link AFTER successful apply
      window.open(viewedComapany.applicationLink, "_blank");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex size-full'>
      <div className={`size-full p-20 max-sm:p-10 flex gap-10  ${viewedComapany?"flex-col w-1/2 duration-200 overflow-y-scroll":"flex-wrap"}`}>
        {companies.map((ele) =>
          <div key={ele._id} className='h-[280px] w-[400px] min-w-[400px] max-sm:min-w-0 max-sm:w-full max-sm:h-[360px] bg-white rounded-2xl shadow-2xl p-5 flex flex-col gap-5 relative'>

            {/* Applied Flag */}
            {hasApplied(ele._id) && (
              <div className='absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
                Applied
              </div>
            )}

            <div className='text-2xl font-bold'>
              <span>{ ele.companyName}</span>
            </div>
            <div className='flex gap-2 overflow-x-scroll'>
              {ele.companyLocation.map((el)=><span key={el} className='bg-sky-50 p-1.5 text-sm rounded-xl text-blue-400'>{el}</span>)}
            </div>

            <div className='flex gap-2 overflow-x-scroll'>
              {ele.requiredSkills.map((el)=><span key={el} className='bg-lime-50 p-1.5 text-sm rounded-xl text-lime-800'>{el}</span>)}
            </div>

            <div className='w-full flex gap-1 max-sm:flex-col'>
              <div className='grow flex items-center font-bold'>
                <span className='pr-1'>CTC :  </span>
                <span>{ ele.CTC }</span>
              </div>
              <div className='grow font-bold max-sm:flex max-sm:flex-col'>
                <span>Last Date : </span>
                <span className='text-red-500'>
                  {ele.applicationDeadline.split("T")[0].split("-").reverse().join("-")}
                </span>
              </div>
            </div>
            <div className='w-full h-10 bg-slate-800 rounded-2xl'>
              <button className='size-full flex justify-center items-center text-white font-bold' onClick={()=>handelClickView(ele)}>
                View Details
              </button>
            </div>
          </div>
        )}
      </div>

      {viewedComapany && (
        <div className='w-1/2 h-full bg-white p-10 overflow-y-scroll shadow-2xl rounded-l-3xl relative max-sm:w-full max-sm:fixed max-sm:left-10'>
          <div className='absolute right-20 top-12 text-xl text-red-600' onClick={handelClickCloseView}>
            <IoClose />
          </div>
          <h1 className='text-3xl font-bold text-slate-800 mb-5'>
            {viewedComapany.companyName}
          </h1>

          <div className='mb-4'>
            <p className='text-lg font-semibold text-slate-700'>CTC: 
              <span className='text-blue-600 ml-2'>{viewedComapany.CTC}</span>
            </p>
            <p className='text-lg font-semibold text-slate-700'>
              Last Date:
              <span className='text-red-600 ml-2'>
                {viewedComapany.applicationDeadline.split("T")[0].split("-").reverse().join("-")}
              </span>
            </p>
          </div>

          <hr className='my-4' />

          <h2 className='text-xl font-semibold text-slate-900 mb-2'>Locations</h2>
          <div className='flex flex-wrap gap-2 mb-4'>
            {viewedComapany.companyLocation.map((loc) => (
              <span key={loc} className='bg-blue-50 text-blue-700 p-2 rounded-xl text-sm'>{loc}</span>
            ))}
          </div>

          <h2 className='text-xl font-semibold text-slate-900 mb-2'>Required Skills</h2>
          <div className='flex flex-wrap gap-2 mb-4'>
            {viewedComapany.requiredSkills.map((skill) => (
              <span key={skill} className='bg-lime-50 text-lime-700 p-2 rounded-xl text-sm'>{skill}</span>
            ))}
          </div>

          <h2 className='text-xl font-semibold text-slate-900 mb-2'>Job Functions</h2>
          <ul className='list-disc ml-5 text-slate-700 mb-4'>
            {viewedComapany.jobFunctions.map((func) => (
              <li key={func}>{func}</li>
            ))}
          </ul>

          <h2 className='text-xl font-semibold text-slate-900 mb-2'>Role Overview</h2>
          <ul className='list-disc ml-5 text-slate-700 mb-4'>
            {viewedComapany.roleOverview.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className='text-xl font-semibold text-slate-900 mb-2'>Eligibility Criteria</h2>
          <ul className='list-disc ml-5 text-slate-700 mb-4'>
            {viewedComapany.eligibilityCriteria.map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ul>

          <h2 className='text-xl font-semibold text-slate-900 mb-3'>Useful Links</h2>
          <div className='flex flex-col gap-3'>
            <a href={viewedComapany.companyWebsite} target='_blank' className='text-blue-600 underline'>
              Company Website
            </a>

            <a href={viewedComapany.jobDescriptionLink} target='_blank' className='text-blue-600 underline'>
              Job Description
            </a>

            <a href={viewedComapany.brochureLink} target='_blank' className='text-blue-600 underline'>
              Brochure
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
                hasApplied(viewedComapany._id)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition"
              }`}
              disabled={hasApplied(viewedComapany._id)}
              onClick={()=>handelClick(viewedComapany._id)}
            >
              {hasApplied(viewedComapany._id) ? "Already Applied" : "Apply"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Companies
