import React from 'react'
import { Link } from 'react-router-dom'
import hambur from '../images/hamburguesa.webp'

const RecipeCard = ({ recipe }) => {
    //const { image, label, cuisineType, dietLabel, mealType, uri } = recipe?.recipe

    //const id = uri?.split("#")[1]

    if (!recipe) {
        console.log(recipe)
        return null; // O muestra un mensaje de error o un componente de carga
    }

    //const { image, title, id } = recipe?.recipe
    const { image, title, id } = recipe;
    const imageUrl = image || hambur;
    //const id = uri?.split("#")[1]
    //console.log(id)

    return (
        <Link to={`recipe/${id}`} className='w-full md:w-[220px] pt-40'>
            <div className='bg-_gradient shadow w-full rounded-lg '>
                <img src={imageUrl} alt={title} className='rounded-lg h-[200px] md:h-[150px] w-full' />

                <div className='p-3'>
                    <p className='text-white font-semibold'>{title}</p>
                </div>
            </div>
        </Link>
)
}
    
    /*return (
        <Link to = {'/recipes/${id}'} className='w-full md:w-[220px]'>
            <div className='bg-_gradient shadow w-full rounded-lg'>
                <img src={image} alt={label} className='rounded-lg h-[200px] md:h-[150px] w-full'/>
                <div className='p-3'>
                    <p className='text-white font-semibold'>{label}</p>

                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500'>
                            {cuisineType}
                        </span>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500'>
                            {mealType}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}*/

export default RecipeCard;