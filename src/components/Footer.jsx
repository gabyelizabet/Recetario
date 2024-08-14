import React from "react";

const Footer = () =>{
    return(
        <footer className="text-white py-20 bg_gradient ">
            <div className="container mx-auto px-20 lg:px-20 py-20 flex flex-col gap-10 md:flex-row justify-between border-t border-slate-800">
                <div className="flex">
                    <p className="font-bold text-center">
                        Mis<span className="text-green-500 text-xl">Sabores</span>
                    </p>
                </div>
                <div>
                    <p>Creado por</p>
                    <div>
                        <p>Gabriela Miguel</p>
                        <p>Federico Lemos</p>
                    </div>
                </div>
                <div>
                    <p>Proyecto Final</p>
                    <p>Programacion 3</p>
                    <p>T.M</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer