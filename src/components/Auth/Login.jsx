import { useRef, useState } from "react";
import { Photo1, Photo2, Photo3 } from "../../images";


const images = [Photo1, Photo2, Photo3];

function Login() {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            // Simula un retraso en la carga
            setTimeout(() => {
                setIsLoading(false);
                // Aquí puedes manejar el error si lo deseas
                // Por ejemplo, establecer `setIsError(true)` para mostrar un mensaje de error
            }, 1000);
        }
    }

    return (
        <div className="'w-full h-[100vh]">
            <img src={images[Math.floor(Math.random() * images.length)]} 
                alt="Recipes" 
                className="w-full h-full object-cover"
            />
            <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4">
                <div className=" text-white py-5 bg_gradient p-8 rounded-lg shadow-lg w-full max-w-sm ">
                    <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-white">Nombre de usuario:</label>
                            <div className="relative mt-1">
                                <input
                                    className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none bg-transparent border border-white text-white hover:bg-white hover:text-black sm:text-sm"
                                    type="text"
                                    id="username"
                                    name="username"
                                    ref={usernameRef}
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white">Contraseña:</label>
                            <div className="relative mt-1">
                                <input
                                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none bg-transparent border-white text-white hover:bg-white hover:text-black sm:text-sm"
                                    type="password"
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="w-full py-2 px-4 rounded-md shadow-sm bg-transparent border border-white text-white hover:bg-white hover:text-black"
                            >
                                Enviar
                            </button>
                            {isLoading && <p className="mt-2 text-gray-500">Cargando...</p>}
                            {isError && <p className="mt-2 text-red-500">Error al cargar los datos.</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
