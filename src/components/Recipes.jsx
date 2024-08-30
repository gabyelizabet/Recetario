import React, {useEffect, useState} from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import { fetchRecipes, fetchRecipe, fetchCategorias} from '../hooks'
import Button from "./Button";

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [options, setOptions] = useState([])
    const [query, setQuery] = useState(1)
    const [limit, setLimit] = useState(10)
    const [loading, setLaoding] = useState(false)

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const fetchReceta = async () => {
        try {
            //const categorias = await fetchCategorias()
            //console.log(categorias)
            //const name_cat = categorias.name
            //console.log(name_cat)
            const categorias = await fetchCategorias();
            const Options = categorias.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setOptions(Options);
            //console.log(categorias)
            /*if (categorias) {
              const name_cat = categorias.results;
              console.log(name_cat);
            }*/

            const recipes_id = await fetchRecipes({ query});
            //console.log(data)
            const eleminarRepetidas = new Set(recipes_id);
            const data = Array.from(eleminarRepetidas);
            //console.log(unicos);
            if (data && data.length > 0) {
                //console.log(data.length)
                // Supongamos que queremos obtener recetas de la primera categoría
                /*const idReceta = data[0];
                console.log(idReceta)
                //const recetaDetallada = await fetchRecipe(idReceta)
                //console.log(recetaDetallada)
                const recetaDetallada = await fetchRecipe(idReceta);
                console.log('Detalles de la receta:', recetaDetallada);}*/
                /*data.forEach(async (idReceta, index) => {
                    //console.log(`Receta ${index + 1} - ID: ${idReceta}`);
                    const recetaDetallada = await fetchRecipe(idReceta);
                    //console.log('Detalles de la receta:', recetaDetallada);
                    setRecipes(recetaDetallada)
                    console.log(recetaDetallada)
                })}*/
                    // Almacenar los detalles de las recetas en el estado
                    const detailedRecipes = await Promise.all(data.map(async (idReceta) => {
                        return await fetchRecipe(idReceta);
                    }));
            
                    setRecipes(detailedRecipes);
                    //console.log(detailedRecipes)
                } else {
                    // No se encontraron recetas
                    setRecipes([]);
                }

            //setRecipes(recetaDetallada)
                //setRecipes(idReceta)
            //console.log(data)

            setLaoding(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLaoding(false)
        }
    }

    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        fetchReceta()
    }

    const showMore = () => {
        setLimit(prev => prev + 10)
        fetchReceta()
    }

    useEffect(() => {
        setLaoding(true)

        fetchReceta()

    }, [])

    if (loading) {
        return (
          <div className='w-full h-[100vh] flex items-center justify-center'>
            <Loading />
          </div>
        );
      }

    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10'>
                <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                    <SearchBar
                        placeholder="eg. Cake, Vegan, Chicken"
                        handleInputChange={handleChange}
                        rightIcon={<BiSearchAlt2 className='text-gray-600' onClick={handleSearchedRecipe} />}
                        options ={options.map((option) => ({
                            value: option.value,
                            label: option.label,
                        }))}
                    />
                </form>

            </div>

            {
                recipes?.length > 0 ? (
                    <>
                        <div className='w-full  flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                            {
                                recipes?.map((item, index) => (
                                    <RecipeCard recipe={item} key={index} />))
                            }
                        </div>

                        <div className='flex w-full items-center justify-center py-10'>

                            <Button
                                title="Show More"
                                containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                                handleClick={showMore}
                            />
                        </div>
                    </>
                ) : <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>No Recipe Found</p>
                </div>
            }
        </div>
    )
}
    /*options={[
                            { value: 1, label: "Postre" },
                            { value: 2, label: "Fáciles" },
                            { value: 3, label: "Ensaladas" },
                           // ... otras opciones
                        ]}
    <Searchbar placeholder="eg. Cake, Vegan, Chicken"
                        handleInputChange={handleChange}
                        rightIcon={
                            <BiSearchAlt2 className='text-gray-600' onClick={handleSearchedRecipe} />
                        }
                    />
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
};*/

export default Recipes;


    
