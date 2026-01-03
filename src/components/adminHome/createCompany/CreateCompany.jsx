import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// import { createCompany } from '../../slice/authSlice'; // async thunk to create company
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import Logo from '../../logo/Logo';

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyWebsite: '',
    jobDescriptionLink: '',
    applicationLink: '',
    brochureLink: '',
    applicationDeadline: '',
    jobFunctions: [''],
    CTC: '',
    eligibilityCriteria: [''],
    companyLocation: [''],
    requiredSkills: [''],
    placementOpportunities: [''],
    roleOverview: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field, index) => {
    const newArray = [...companyData[field]];
    newArray[index] = e.target.value;
    setCompanyData(prev => ({ ...prev, [field]: newArray }));
  };

  const addField = (field) => {
    setCompanyData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeField = (field, index) => {
    const newArray = companyData[field].filter((_, i) => i !== index);
    setCompanyData(prev => ({ ...prev, [field]: newArray.length ? newArray : [''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await dispatch(createCompany(companyData)).unwrap();
    //   console.log(res);
    //   navigate('/companies');
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const arrayFields = [
    { label: 'Job Functions', name: 'jobFunctions' },
    { label: 'Eligibility Criteria', name: 'eligibilityCriteria' },
    { label: 'Company Locations', name: 'companyLocation' },
    { label: 'Required Skills', name: 'requiredSkills' },
    { label: 'Placement Opportunities', name: 'placementOpportunities' },
    { label: 'Role Overview', name: 'roleOverview' },
  ];

  return (
    <div className='size-full flex justify-center items-center'>
      <form className='w-1/2 h-[90%] flex flex-col gap-4 p-5 rounded-2xl shadow-2xl overflow-y-scroll' onSubmit={handleSubmit}>
        {loading && (
          <div className='size-full flex justify-center items-center absolute opacity-40'>
            <Logo className="scale-[3]" />
          </div>
        )}

        <h1 className='text-2xl font-bold flex justify-center mb-4'>Create Company</h1>

        {/* Simple text inputs */}
        {['companyName','companyWebsite','jobDescriptionLink','applicationLink','brochureLink','CTC'].map(field => (
          <div key={field} className={`w-full min-h-10 border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${companyData[field] ? "border-2 rounded-md" : ""}`}>
            <input
              type="text"
              name={field}
              value={companyData[field]}
              onChange={handleChange}
              className='size-full outline-0'
            />
            <label className={`absolute left-2 duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white group-focus-within:text-[12px] group-focus-within:px-1 ${companyData[field] ? "absolute bg-white -top-2.5 text-[12px] px-1" : "top-1"}`}>
              {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
          </div>
        ))}

        {/* Date input */}
                    <div className={`w-full min-h-10 border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${companyData.applicationDeadline?"border-2 rounded-md":""}`}>
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={companyData.applicationDeadline}
                        onChange={handleChange}
                        className={`size-full outline-0 ${companyData.applicationDeadline ? "" : "empty"}`}
                        id="applicationDeadline"
                    />
                    <label htmlFor="applicationDeadline" className={`absolute left-2 duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white group-focus-within:text-[12px] group-focus-within:px-1 ${companyData.applicationDeadline?"-top-2.5 bg-white text-[12px] px-1":""}`}>
                        Application Deadline
                    </label>
                    </div>


        {/* Dynamic array inputs */}
        {arrayFields.map(field => (
          <div key={field.name} className='flex flex-col gap-2'>
            <label className='font-semibold flex justify-between items-center'>
              {field.label}
              <IoAddCircleOutline className='text-blue-600 cursor-pointer' onClick={() => addField(field.name)} />
            </label>
            {companyData[field.name].map((item, index) => (
              <div key={index} className='flex gap-2 items-center'>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(e, field.name, index)}
                  className='border rounded-md p-2 flex-grow outline-none'
                />
                <IoCloseCircleOutline className='text-red-600 cursor-pointer' onClick={() => removeField(field.name, index)} />
              </div>
            ))}
          </div>
        ))}

        <button className='bg-blue-950 text-white rounded-xl py-2 mt-4'>Create Company</button>
      </form>
    </div>
  );
};

export default CreateCompany;
