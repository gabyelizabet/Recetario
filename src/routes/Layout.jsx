import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";


export default function Layout(){
    return (
        <>
        <Navbar/>
            <AuthProvider>
                <Outlet/>
            </AuthProvider>
        <Footer/>
        </>
    )
}

