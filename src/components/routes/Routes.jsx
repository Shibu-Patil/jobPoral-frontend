import { createBrowserRouter } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import VerifyOtp from "../register/VerifyOtp";
import AdminRegister from "../register/admin/AdminRegister";
import AdminLogin from "../login/admin/AdminLogin";
import AdminHome from "../adminHome/AdminHome";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";

const routes=createBrowserRouter([
    {
        path:"/",
        element:<Login></Login>
    },{
        path:"/register",
        element:<Register></Register>
    },{
        path:"/verify-otp",
        element:<VerifyOtp></VerifyOtp>
    },{
        path:"/home",
        element:<PrivateRoutes><Home></Home></PrivateRoutes>
    },{
        path:"/admin-register",
        element:<AdminRegister></AdminRegister>
    },{
        path:"/admin-login",
        element:<AdminLogin></AdminLogin>
    },{
        path:"/admin-home",
        element:<AdminHome></AdminHome>
    }
])


export default routes