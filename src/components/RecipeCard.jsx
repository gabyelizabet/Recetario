import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    //a modificar una vez que tenga la relacion con la API
    const defaultRecipe = {
        image: 'https://via.placeholder.com/150',
        label: 'Receta de Ejemplo',
        cuisineType: 'Internacional',
        dietLabel: 'Vegetariano',
        mealType: 'Cena',
        uri: 'https://example.com#123'
    };  
    
    const { image, label, cuisineType, mealType, uri } = recipe?.recipe || defaultRecipe;
    
    const id = uri?.split("#")[1] || 'default-id';
    
    return (
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
}

export default RecipeCard;