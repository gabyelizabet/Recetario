//import React, { useRef, useState } from 'react';
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'

export default function RecipeForm() {
    const [recipeData, setRecipeData] = useState({ title: "", description: "", cooking_time: "",preparation_time: "",servings: "" });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [recetaImage, setRecetaImage] = useState(null);
    const [idRecipe, setIDRecipe] = useState(null)
    const [stepData, setStepData] = useState({order: 0, instruction: "", recipe: ""});
    const [message, setMessage] = useState('');
    const [steps, setSteps] = useState([1]);
    const [ingredientData, setIngredientData] = useState({quantity: "", measure: "", recipe: "", ingredient: ""});
    const [verIngre, setVerIngre] = useState("")
    const [recipeCreated, setRecipeCreated] = useState(false);

    const state = useAuth("state");
    //console.log("state", state);
    const { token } = useAuth("state");
    //const { user__id } = useAuth("state");
    //console.log(user__id)

    useEffect(
        () => {
            fetch(`https://sandbox.academiadevelopers.com/reciperover/categories/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "No se puedieron cargar las categorías"
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    setCategories(data.results);
                })
                .catch((error) => {
                    console.error("Error al realizar la petición", error);
                })
                .finally(() => {
                    return setLoadingCategories(false);
                });
        },
        [] 
    );

    function handleInputChange(event) {
        setRecipeData({
            ...recipeData,
            [event.target.name]: event.target.value,
        });
        //console.log(recipeData)
    }

    function handleCategoryChange(event) {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            // Referenciamos el id de la categoría que resolvió la petición a la API
            (option) => option.value
        );

        // Filtramos de las categorías consultadas a la API los nuevos elementos seleccionados
        const updatedSelectedCategories = categories.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );

        setSelectedCategories(updatedSelectedCategories);
    }

    function handleImageChange(event) {
        setRecetaImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting && !loadingCategories) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", recipeData.title);
            newForm.append("description", recipeData.description);
            newForm.append("cooking_time", recipeData.cooking_time);
            newForm.append("preparation_time", recipeData.preparation_time);
            newForm.append("servings", recipeData.servings);
            if (recetaImage) {
                newForm.append("image", recetaImage);
            }
            fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo crear la receta");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    setRecipeCreated(true)
                    setIDRecipe(data.id)
                    selectedCategories.forEach((category) => {
                        fetch(
                            `https://sandbox.academiadevelopers.com/reciperover/recipe-categories/`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                },
                                body: JSON.stringify({
                                    recipe: data.id,
                                    category: category.id,
                                }),
                            }
                        );
                    });
                    setMessage('Ingrediente creado');
                    setTimeout(() => {
                    setMessage('');
                    }, 3000); // El mensaje desaparecerá después de 3 segundos
                })
                .catch((error) => {
                    console.error("Error error al crear la receta", error);
                    alert('Error al crear el receta: ' + error.message);

                })
                .finally(() => {
                    return setSubmitting(false);
                });
        }
    }
    function handleStepChange(event) {
        setStepData({
            ...stepData,
            [event.target.name]: event.target.value,
        });
        console.log(stepData)
    }
    function handleStep(event) {
        event.preventDefault();
        //console.log(idRecipe)
        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("instruction", stepData.instruction);
            newForm.append("recipe", idRecipe);
            newForm.append("order", steps)
            setSteps(steps+1)
            fetch(`https://sandbox.academiadevelopers.com/reciperover/steps/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
              .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo crear paso");
                    }
                    return response.json();
              })
              .then((data) => {
                  console.log(data)
                  setStepData({ instruction: '' });
                  setMessage('Paso creado');
                  setTimeout(() => {
                  setMessage('');
                  }, 3000); // El mensaje desaparecerá después de 3 segundos
              }).catch((error) => {
                    console.error("Error error al crear paso", error);
                    alert('Error al crear el paso: ' + error.message);
              })
              .finally(() => {
                    return setSubmitting(false);
              });
        }
        
    }

    //Ingredientes
    function handleIngChange(event) {
        setVerIngre(event.target.value)
        console.log(verIngre)
    }

    function handleIngredientChange(event) {
        setIngredientData({
            ...ingredientData,
            [event.target.name]: event.target.value,
        });
        console.log(ingredientData)
    }

    function handleIngredient(event) {
        event.preventDefault();
        fetch(`https://sandbox.academiadevelopers.com/reciperover/ingredients/?name=${verIngre}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "No se pudo cargar el ingrediente"
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data.results[0].id)
                    console.log(idRecipe)
                    console.log(ingredientData.quantity)
                    const ingredient = data.results[0];
                    if (ingredient.name==verIngre && !submitting){
                            setSubmitting(true);
                            const newForm = new FormData();
                            newForm.append("quantity", ingredientData.quantity);
                            newForm.append("recipe", idRecipe);
                            newForm.append("measure", ingredientData.measure)
                            newForm.append("ingredient", ingredient.id)
                            fetch(`https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/`, {
                               method: "POST",
                               headers: {
                                   Authorization: `Token ${token}`,
                               },
                               body: newForm,
                            })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("No se pudo crear ingrediente");
                                }
                                return response.json();
                            })
                            .then((data) => {
                              console.log(data)
                              setVerIngre('')
                              setIngredientData({quantity:''})
                              setMessage('Ingrediente creado');
                              setTimeout(() => {
                              setMessage('');
                              }, 3000); // El mensaje desaparecerá después de 3 segundos
                            }).catch((error) => {
                                console.error("Error error al crear ingrediente", error);
                                alert('Error al crear el ingrediente: ' + error.message);
                            })
                            .finally(() => {
                                return setSubmitting(false);
                            });
                        }
                })
                .catch((error) => {
                    console.error("Error al realizar la petición", error);
                })
        
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4 pt-20">
            <h1 className="text-white text-2xl mb-4">Nueva Receta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white text-sm font-medium">Título</label>
                    <input
                        type="text"
                        value={recipeData.title}
                        onChange={handleInputChange}
                        name="title"
                        className= "mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        value={recipeData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Tiempo de Cocción</label>
                    <input
                        type="number"
                        value={recipeData.cooking_time}
                        onChange={handleInputChange}
                        name="cooking_time"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                        min="0"
                        step="1"
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Tiempo de Preparación</label>
                    <input
                        type="number"
                        value={recipeData.preparation_time}
                        onChange={handleInputChange}
                        name="preparation_time"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                        min="0"
                        step="1"
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Porciones</label>
                    <input
                        type="number"
                        value={recipeData.servings}
                        onChange={handleInputChange}
                        name="servings"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                        min="0"
                        step="1"
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Imagen:</label>
                    <input
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-white"
                        //className="input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Categorías:</label>
                    <div className="select is-fullwidth is-multiple">
                        <select
                            multiple
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-black text-white"
                            size="3"
                            value={selectedCategories.map((cat) => cat.id)}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                    disabled={submitting || loadingCategories}
                >
                    Crear Receta
                </button>
            </form>
            {recipeCreated && (
            <div>
            <form onSubmit={handleStep} className="space-y-4">
                <div>
                    <label className="text-white block text-sm font-medium">Nuevo Paso</label>
                    <input
                        type="text"
                        name="instruction"
                        value={stepData.instruction}
                        onChange={handleStepChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="step"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                    disabled={submitting}
                >
                    Agregar Paso
                </button>
                
            </form>
            {/* Mensaje de confirmación */}
            {message && <p className="text-green-500 mt-2">{message}</p>}
            <form onSubmit={handleIngredient} className="space-y-4">
                <div>
                    
                    <label className="text-white block text-sm font-medium">Nuevo Ingrediente</label>
                    <label htmlFor="nombre" className="text-white mr-2">Ingrese Nombre:</label>
                    <input
                        id="nombre"
                        type="text"
                        value={verIngre}
                        onChange={handleIngChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <label className="text-white mr-2">Ingrese Cantidad:</label>
                    <input
                        name="quantity"
                        type="number"
                        value={ingredientData.quantity}
                        onChange={handleIngredientChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        min="0"
                        step="1"
                        required
                    />
                    <label className="text-white mr-2">Elige una medida:</label>
                    <select name="measure" onChange={handleIngredientChange} value={ingredientData.measure} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-black text-white">
                      <option>g</option>
                      <option>kg</option>
                      <option>lbs</option>
                      <option>oz</option>
                      <option>ml</option>
                      <option>l</option>
                      <option>cup</option>
                      <option>tbsp</option>
                      <option>tsp</option>
                      <option>u</option>
                      <option>pcs</option>
                      <option>pkgs</option>
                      <option>pinch</option>
                      <option>bunch</option>
                    </select>
                    
                </div>
                
                <button
                    type="step"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                    disabled={submitting}
                >
                    Agregar Ingrediente
                </button>
                
            </form>
            </div>
            )}
        </div>
    );
};