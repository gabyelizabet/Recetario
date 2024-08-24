import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import RecipeDetail from "../pages/RecipeDetail";
import RecipesPage from "../pages/RecipesPage";
import Login from "../components/Auth/Login";
import Profile from "../pages/Profile";

const Router = createBrowserRouter([
    {
        element: <div className="bg-black"><Layout /></div>,
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
                path: "recipes/recipe/:id",
                element: <RecipeDetail/>
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
        
    
  


