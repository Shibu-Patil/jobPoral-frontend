import { createBrowserRouter } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";

const routes=createBrowserRouter([
    {
        path:"/",
        element:<Login></Login>
    },{
        path:"/register",
        element:<Register></Register>
    }
])


export default routes