import { useAuth } from "../contexts/AuthContext";
import React, { useState, useContext } from 'react'
import Logo from '../images/Logo.png'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth("state");
    console.log(isAuthenticated)
    const isRegistered = isAuthenticated;
    const [warning, setWarning ] = useState (false); 
    
    const handleProfileClick =() => {
        if (!isRegistered) {
            setWarning(true);
        } else {
            navigate('/profile');
        }
    };
    const handleAddClick =() => {
        if (!isRegistered) {
            setWarning(true);
        } else {
            navigate('/add');
        }
    };

    const handleLoginRedirect = () => {
        setWarning(false)
        navigate('/login');
    };

    const handleCancel = () => {
        setWarning(false);
    }
  

    return (
        <header className='w-full fixed z-10 bg-black opacity-90'>
            <nav className='flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between'>
                <Link to="/" className='flex items-center justify-center text-white text-lg cursor-pointer'>
                    <img src={Logo} alt="Logo" className='hidden md:block w-8 h-8 lg:w-14 lg:h-14' />
                    Mis<span>Sabores</span>
                </Link>

                <ul className='hidden md:flex text-white gap-6'>
                    <li>
                        <Link to= "/">Home</Link>
                    </li>
                    <li>
                        <Link to= "/recipes">Recetas</Link>
                    </li>
                    <li>
                        <button onClick={handleAddClick}>Agregar Receta</button>
                    </li> 
                </ul>

                <Button
                    title = 'Perfil'
                    containerStyle='hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
                    handleClick = {handleProfileClick}
                    
                />

                <button className='block md:hidden text-white text-xl'
                    onClick={() => setOpen(prev => !prev)}>
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button> 

                {warning && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
                    <div className=" bg-black opacity-90 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-lg font-semibold mb-4">No estás logueado</h2>
                            <p className="mb-4">Debes iniciar sesión para acceder.</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                                    onClick={handleLoginRedirect}
                                >
                                    Iniciar Sesión
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                                    onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </nav>
        </header>
    )
}
/**/
export default Navbar
