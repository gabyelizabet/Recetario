import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import RecipeDetail from "../pages/RecipeDetail";
import RecipesPage from "../pages/RecipesPage";
import Login from "../components/Auth/Login";
import Profile from "../components/profile";


const Router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "recipes",
                children: [
                    {
                        index: true,
                        element: <RecipesPage/>,
                    },
                    {
                        path: ":id",
                        element: <RecipeDetail/>,
                    }
                ]
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element : <h1>Página no encontrada</h1>
    }
])
    export default Router
        
    
  


