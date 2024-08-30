import React from "react";
import {Photo1, Photo2, Photo3, Photo4, Photo5, Photo6} from "../images"

const images = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];

const Cabecera = ({ title, image, type, description, view_count }) => {
  return (
    <div className='w-full h-[100vh]'>
      <div className='relative w-full h-full'>
        <img src={image ?? images[Math.floor(Math.random() * images.length)]}
          alt='Hero Image'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4 '>
        <h1 className='text-white text-4xl md:text-5xl font-bold text-center'>{title}</h1>
        {
          type && (
            <p className='text-sm mt-4 text-center text-green-500 bg-[#00000090] px-6 py-4 rounded-full '>¡Bienvenidos a Mis Sabores, un lugar para los amantes del buen comer!
              <br className='hidden md:block' />Descubre aqui las recetas mas deliciosas de todo el mundo.</p>
          )
        }
        {
          description&& (
            <p className='text-sm mt-4 text-center text-green-500 bg-[#00000090] px-6 py-4 rounded-full '>{description}
            </p>
          )
        }
      </div>
    </div>
  )
}



export default Cabecera
