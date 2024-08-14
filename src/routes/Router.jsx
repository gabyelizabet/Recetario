import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter ([
    {
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            }
        ]
    }
])

export {Router}