import React, {useEffect, useState} from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import Button from "./Button";
//Falta importar la coneccion con la API

//Recetas para probar interfaz sin conexion
const exampleRecipes = [
    {
        recipe: {
            image: 'https://via.placeholder.com/150',
            label: 'Ensalada Vegana',
            cuisineType: 'Mediterráneo',
            dietLabel: 'Vegano',
            mealType: 'Almuerzo',
            uri: 'https://example.com#1'
        }
    },
    {
        recipe: {
            image: 'https://via.placeholder.com/150',
            label: 'Tacos de Frijol',
            cuisineType: 'Mexicano',
            dietLabel: 'Vegetariano',
            mealType: 'Cena',
            uri: 'https://example.com#2'
        }
    },
];

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('Vegan')
    const [limit, setLimit] = useState(30)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // Simula la obtención de recetas sin API
    const fetchRecipe = () => {
        setLoading(false);

        // Simula un retraso para mostrar el indicador de carga
        setTimeout(() => {
            // Filtra los datos de ejemplo según la consulta
            const filteredRecipes = exampleRecipes.filter(recipe =>
                recipe.recipe.label.toLowerCase().includes(query.toLowerCase())
            );
            setRecipes(filteredRecipes);
            setLoading(false);
        }, 1000); // Simula un retraso de 1 segundo
    };

    const handleSearchedRecipe = (e) => {
        e.preventDefault();
        fetchRecipe();
    };

    const showMore = () => {
        setLimit(prev => prev + 10);
        fetchRecipe();
    };

    useEffect(() => {
        fetchRecipe();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10'>
                <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                    <SearchBar
                        placeholder="eg. Cake, Vegan, Chicken"
                        handleInputChange={handleChange}
                        rightIcon={<BiSearchAlt2 className='text-gray-600' onClick={handleSearchedRecipe} />}
                    />
                </form>
            </div>

            {recipes?.length > 0 ? (
                <>
                    <div className='w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                        {recipes.map((item, index) => (
                            <RecipeCard recipe={item} key={index} />
                        ))}
                    </div>

                    <div className='flex w-full items-center justify-center py-10'>
                        <Button
                            title="Mostrar Más"
                            containerStyle="bg-green-800 text-white px-3 py-1  rounded-full text-sm mr-4"
                            handleClick={showMore}
                        />
                        <Button
                            title="  Agregar "
                            containerStyle="bg-green-800 text-white px-3 py-1  rounded-full text-sm mr-4"
                            handleClick={showMore}
                        />
                        <Button
                            title="  Eliminar  "
                            containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                            handleClick={showMore}
                        />
                    </div>
                </>
            ) : (
                <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>No Recipe Found</p>
                </div>
            )}
        </div>
    );
};

export default Recipes;


    
