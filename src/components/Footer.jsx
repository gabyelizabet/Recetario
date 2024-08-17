import React from "react";
import Button from "./Button";

const Footer = () =>{
    return (
              
        <footer className="text-white py-5 bg_gradient ">
            <div className="container mx-auto px-20 lg:px-20 py-3 flex flex-col gap-10 md:flex-row justify-between border-t border-slate-800">
                <div className="">
                    <p className="font-bold text-center">
                        <span className="text-green-500">MisSabores</span>
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <p className="text-center md:text-left">Creado por</p>
                    <div className="flex flex-col text-center md:text-left mb-4 md:mb-0">
                        <p className='py-1'>Gabriela Miguel</p>
                        <p className='py-1'>Federico Lemos</p>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <div className="text-center md:text-left text-sm">
                        <p className='py-1'>Proyecto Final</p>
                        <p className='py-1'>Programacion 3</p>
                        <p className='py-1'>T.M</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <Button 
                        title='Ingresar'
                        btnType='button'
                        containerStyle='mt-10 md:block bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-md min-w-[130px]'
                    />
                </div>
            </div>
        </footer>
    )
}
    

export default Footer