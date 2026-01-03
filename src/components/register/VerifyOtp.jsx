import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../slice/authSlice';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
  const { state } = useLocation();
  const [ottp, setOttp] = useState({ otp: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelChange = (e) => {
    setOttp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: state.userId,
      otp: ottp.otp,
    };

    try {
      const result = await dispatch(verifyOtp(payload));

      // check if fulfilled
      if (result.meta.requestStatus === 'fulfilled') {
        // toast.success('OTP verified successfully');
        navigate('/'); // navigate to home page
      } else {
        toast.error(result.payload || 'OTP verification failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const { otp } = ottp;

  return (
    <div className='size-full flex justify-center items-center'>
      <form
        onSubmit={handelSubmit}
        className='w-1/3 flex flex-col justify-between gap-6 p-5 overflow-y-scroll shadow-2xl rounded-2xl max-lg:w-1/2 max-md:w-2/3 max-sm:w-[95%]'
      >
        <div className='flex gap-3'>
          <span className='uppercase font-bold'>OTP sent on :</span>
          <span>{state.email}</span>
        </div>

        <div
          className={`w-full h-10 min-h-10 justify-center items-center border-b-2 px-2 relative group focus-within:border-2 focus-within:rounded-md ${
            otp ? 'border-2 rounded-md' : ''
          }`}
        >
          <input
            type='text'
            id='otp'
            className='size-full outline-0'
            name='otp'
            value={otp}
            onChange={handelChange}
          />
          <label
            htmlFor='otp'
            className={`absolute left-2 duration-100 group-focus-within:-top-2.5 group-focus-within:bg-white group-focus-within:text-[12px] group-focus-within:px-1 ${
              otp ? 'absolute bg-white -top-2.5 text-[12px] px-1' : 'top-1'
            }`}
          >
            Verify OTP
          </label>
        </div>

        <div className='w-full h-10 min-h-10'>
          <button className='size-full bg-blue-950 text-white rounded-xl'>
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
