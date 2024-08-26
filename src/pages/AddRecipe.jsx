import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'

const AddRecipe= () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const { isAuthenticated } = useAuth("state");

    const handleAddClick =() => {
        if (!isAuthenticated) {
            setWarning(true);
        } else {
            navigate('/add');
        }
    };

    const handleLoginRedirect = () => {
        setWarning(false)
        navigate('/login');
    };

    const handleCancel = () => {
        setWarning(false);
    }

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index] = event.target.value;
        setSteps(newSteps);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, '']);
    };

    const addStepField = () => {
        setSteps([...steps, '']);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Enviar la receta al backend
        try {
            const response = await fetch('https://sandbox.academiadevelopers.com/reciperover/recetas', { // Cambia esta URL según tu configuración
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    image,
                    cooking_time: cookingTime,
                    preparation_time: preparationTime,
                    servings,
                    ingredients,
                    steps,
                }),
            });

            if (response.ok) {
                // Manejar respuesta positiva
                alert('Receta añadida con éxito');
                // Limpiar el formulario
                setTitle('');
                setDescription('');
                setImage('');
                setCookingTime('');
                setPreparationTime('');
                setServings('');
                setIngredients(['']);
                setSteps(['']);
            } else {
                // Manejar errores
                alert('Error al añadir la receta');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al añadir la receta');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4 pt-20">
            <h1 className="text-white text-2xl mb-4">Añadir Nueva Receta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white text-sm font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className= "mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Imagen URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Tiempo de Cocción</label>
                    <input
                        type="number"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Tiempo de Preparación</label>
                    <input
                        type="number"
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Porciones</label>
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Ingredientes</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <button
                                type="button"
                                onClick={addIngredientField}
                                className="p-2 bg-green-500 text-white rounded-md"
                            >
                                Añadir Ingrediente
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Pasos</label>
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={step}
                                onChange={(e) => handleStepChange(index, e)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <button
                                type="button"
                                onClick={addStepField}
                                className="p-2 bg-green-500 text-white rounded-md"
                            >
                                Añadir Paso
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                >
                    Enviar Receta
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;



/*import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


const CrearReceta = () => {
    const navigate = useNavigate()
    const { token } = useAuth("state");
    const params = useParams()
    const [receta, setReceta] = useState({
    title:"",
    description:"",
    preparation_time:"",
    cooking_time:"",
    servings:"",
    image:""
  });

  const [ingredientes, setIngredientes]=useState([])
  const [ingOriginales, setIngOriginales]=useState([])
  const [ingredienteSeleccionado, setIngredienteSeleccionado]=useState({
    ingrediente:"",
    name:"",
    quantify:"",
    measure:"",
  })

  const [pasoActual, setPasoActual]=useState()
  const [pasos, setPasos]=useState([])
  const [pasosOriginales, setPasosOriginales]=useState([])
  const handleChangeReceta=(e)=>{
    const {name, value} = e.target
    setReceta(state => ({
        ...state,
        [name]: value
    }))
  }

  const handleChangeIngredientes=(e)=>{
    const {name, value} = e.target
    if (name=="ingredient"){
        const nombreIngrediente = ingredients.find(ingrediente=> ingrediente.id===parseInt(value))
        setIngredienteSeleccionado(state => ({
            ...state,
            [name]: value,
            name: nombreIngrediente.name
        }))
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if (modo=="crear"){

        try{
            const recetaForm = new FormData();
            recetaForm.append('title', receta.title);
            recetaForm.append('description', receta.description);
            recetaForm.append('preparation_time', receta.preparation_time);
            recetaForm.append('cooking_time', receta.cooking_time);
            recetaForm.append('servings', receta.servings);
            recetaForm.append('image', receta.image);

            console.log("RECETA", receta)
            const response = await axios.post{
                'https://sandbox.academiadevelopers.com/reciperover/recipes',
                recetaForm,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Token ${token}`
                    }
                }
            };
            const idReceta = response.data.id
        }
    }
  };
}
export default CrearReceta*/