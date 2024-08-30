import React from 'react'
import { Link } from 'react-router-dom'
import hambur from '../images/hamburguesa.webp'

const RecipeCard = ({ recipe }) => {

    if (!recipe) {
        console.log(recipe)
        return null; // O muestra un mensaje de error o un componente de carga
    }

    const { image, title, id } = recipe;
    const imageUrl = image || hambur;
    //console.log(id)

    return (
        <Link to={`recipe/${id}`} className='w-full md:w-[220px] '>
            <div className='bg-_gradient shadow w-full rounded-lg '>
                <img src={imageUrl} alt={title} className='rounded-lg h-[200px] md:h-[150px] w-full' />

                <div className='p-3'>
                    <p className='text-white font-semibold'>{title}</p>
                </div>
            </div>
        </Link>
)
}

export default RecipeCard;