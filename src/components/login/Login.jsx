import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../logo/Logo";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const { email, password } = loginData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    // Later: dispatch(loginUser(loginData))
  };

  return (
    <div className="size-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-[75%] flex justify-between"
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
                Login
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
  );
};

export default Login;
