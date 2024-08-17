import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import RecipeDetail from "../pages/RecipeDetail";
import RecipesPage from "../pages/RecipesPage";
import Login from "../components/Auth/Login";

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
                element: <RecipesPage/>
            },
            {
                path: "recipe/:id",
                element: <RecipeDetail/>
            },
            {
                path: "login",
                element: <Login/>
            },
        ],
    },
    {
        path: "*",
        element : <h1>Not Found</h1>
    }
])
    export default Router
        
    
  


