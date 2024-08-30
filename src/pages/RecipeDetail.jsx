import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { fetchRecipe, fetchPasos, fetchIngredients, fetchCant_Uni, fetchComentarios } from '../hooks'
import Loading from '../components/Loading';
import Cabecera from '../components/Cabecera';
import { AiFillPushpin } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
//import ModificarReceta from "../pages/ModificarReceta"
import { useNavigate } from 'react-router-dom';
//import RecipeCard from '../components/RecipeCard';
import Button from '../components/Button';

const RecipeDetail = () => {
    const [recipeData, setRecipeData] = useState(null)
    const [pasos, setPasos] = useState([])
    const [comentarios, setComentarios] = useState([])
    const [ingredientes, setIngredientes] = useState([])
    const [loading, setLoading] = useState(false)
    const [commentData, setCommentData] = useState({ content: "", recipe: ""});
    const [message, setMessage] = useState('');
    const [idRecipe, setIDRecipe] = useState(null)
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    //const StepRef = useRef(null);
    const [stepAnterior, setStepAnterior] = useState("")
    const [stepNuevo, setStepNuevo] = useState("")
    const [orderStep, setOrderStep] = useState("")
    const [ingreMod, setIngreMod] = useState([])
    const [ingredientData, setIngredientData] = useState({ingModi: "", quantity: "", measure: ""})

    const { token } = useAuth("state");
    const { user__id } = useAuth("state");
    console.log(user__id)

    //Comentarios
    function handleInputChange(event) {
      setCommentData({
          ...commentData,
          [event.target.name]: event.target.value,
      });
      console.log(commentData)
    }
    function handleSubmit(event) {
      event.preventDefault();
      setIDRecipe(id)
      //console.log(idRecipe)
      if (!submitting) {
          setSubmitting(true);
          const newForm = new FormData();
          newForm.append("content", commentData.content);
          newForm.append("recipe", idRecipe);
          fetch(`https://sandbox.academiadevelopers.com/reciperover/comments/`, {
              method: "POST",
              headers: {
                  Authorization: `Token ${token}`,
              },
              body: newForm,
          })
            .then((response) => {
                  if (!response.ok) {
                      throw new Error("No se pudo crear comentario");
                  }
                  return response.json();
            })
            .then((data) => {
                console.log(data)
            }).catch((error) => {
                  console.error("Error error al crear comentario", error);
            })
            .finally(() => {
                  return setSubmitting(false);
            });
      }
      setComentarios([...comentarios, commentData.content]);
      setCommentData({ content: '' });
      setMessage('Comentario creado');
      setTimeout(() => {
        setMessage('');
      }, 3000); // El mensaje desaparecerá después de 3 segundos
    }

    //Detalles Receta
    const { id } = useParams()
  
    const getRecipe = async (id) => {
      try {
        setLoading(true)
  
        const data = await fetchRecipe(id)
        //console.log(data)
        const ingred= data.ingredients
        //console.log(ingred)
        setRecipeData(data)
        const owner = data.owner
        //console.log(owner)
  
        const pas = await fetchPasos(id);
        console.log(pas)
        const pasosOrdenados = pas.sort((a, b)=>a.order-b.order);
        console.log(pasosOrdenados)
        const pa = pas.map((receta)=> receta.instruction);
        //console.log(pa)
        setPasos(pa)

        const comments = await fetchComentarios(id);
        const comentarios = comments.map((comment)=> comment.content);
        console.log(comentarios)
        setComentarios(comentarios)

        //const cant = await fetchCant_Uni(id);
        //console.log(cant)
        //const id_ingrediente = cant.map((canti)=>({id: canti.ingredient, quantify: canti.quantity, measure: canti.measure}));
        //console.log(id_ingrediente)

        //const quanty = cant.map((canti)=> canti.measure);
        //console.log(quanty)
  
        const detailedIng = await Promise.all(ingred.map(async (name) => {
          return await fetchIngredients(name);
        }));
        console.log(detailedIng)
        setIngredientes(detailedIng)
  
        setLoading(false)
  
  
      } catch (error) {
        console.log(error)
  
        setLoading(false)
      }
    }
  
    useEffect(() => {
      getRecipe(id)
    }, [id])
  
  
    if (loading) {
      return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
          <Loading />
        </div>
      );
    }
    //console.log(recipeData)

    //Modificar pasos
    function handleStepChange(event) {
      setStepAnterior(event.target.value)
      console.log(stepAnterior)
    }

    function handleStepNuevo(event) {
      setStepNuevo(event.target.value)
      console.log(stepNuevo)
    }

    function handleStep(event) {
      event.preventDefault();
            fetch(`https://sandbox.academiadevelopers.com/reciperover/steps/?instruction=${stepAnterior}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "No se pudo cargar el ingrediente"
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                  if (data.results.length > 0) {
                    const id_step= data.results[0].id
                    const order = data.results[0].order;
                    setOrderStep(order);

                    const updatedStep = {
                    instruction: stepNuevo,
                    order: order,
                    recipe: id
                    };
                    return fetch(`https://sandbox.academiadevelopers.com/reciperover/steps/${id_step}`, {
                      method: 'PUT',
                      headers: {
                       'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                      body: JSON.stringify(updatedStep)
                    });
                  } else {
                      throw new Error("No se encontró el paso anterior");
                  }
                })
                    .then(response => response.json())
                    .then(data => {
                      console.log('Paso actualizado:', data);
                    })
                    .catch(error => console.error('Error:', error));
    }

    //Modificar Ingredientes

    function handleIngredientChange(event) {
      setIngredientData({
          ...ingredientData,
          [event.target.name]: event.target.value,
      });
      console.log(ingredientData)
    }

    function handleing(event) {
      event.preventDefault();
          fetch(`https://sandbox.academiadevelopers.com/reciperover/ingredients/?recipes=${id}`)
              .then((response) => {
                  if (!response.ok) {
                      throw new Error(
                          "No se puedieron cargar las categorías"
                      );
                  }
                  return response.json();
              })
              .then((data) => {
                  console.log(data)
                  setIngreMod(data.results)
                  const pa = data.results.map((receta)=> receta.name);
                  console.log(pa)
              })
              .catch((error) => {
                  console.error("Error al realizar la petición", error);
              })
      }
    function handleIngMod(event) {
      event.preventDefault();
      const updatedStep = {
        quantity: ingredientData.quantity,
        measure: ingredientData.measure,
        recipe: id,
        ingredient: ingredientData.ingModi
        };
        fetch(`https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/${ingredientData.ingModi}/`, {
          method: 'PUT',
          headers: {
           'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
          body: JSON.stringify(updatedStep)
        })
        .then(response => response.json())
        .then(data => {
          console.log('ingrediente actualizado:', data);
        })
        .catch(error => console.error('Error:', error));
    }
    //
    return (
        <div className='w-full'>
          <Cabecera
            title={recipeData?.title} image={recipeData?.image} description={recipeData?.description} view_count={recipeData?.view_count}
          />
    
          <div className='w-full px-4 lg:px-20 pt-5'>
    
            <div className='flex gap-10 items-center justify-center px-4'>
              <div className='flex flex-col justify-between'>
                <span className='text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2'>{recipeData?.cooking_time.toFixed(0)} </span>
    
                <p className='text-neutral-100 text-[12px] md:text-md'>TIEMPO DE COCCIÓN</p>
              </div>
    
              <div className='flex flex-col justify-center'>
                <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
                  {recipeData?.preparation_time}
                </span>
                <p className='text-neutral-100 text-[12px] md:text-md'>
                  TIEMPO DE PREPARACIÓN
                </p>
              </div>
    
              <div className='flex flex-col justify-center'>
                <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
                  {recipeData?.servings}
                </span>
                <p className='text-neutral-100 text-[12px] md:text-md'>PORCIONES</p>
              </div>
    
    
            </div>
    
            <div className='w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10'>
              {/* LEFT SIDE */}
              <div className='w-full md:w-2/4 md:border-r border-slate-800 pr-1'>
                <div className='flex flex-col gap-5'>
                  <p className='text-green-500 text-2xl underline'>Ingredientes</p>
    
                  {
                    ingredientes?.map((ingredient, index) => {
                      return (
                        <p key={index} className='text-neutral-100 flex gap-2'>
                          <AiFillPushpin className='text-green-800 text-xl' /> {ingredient}
                        </p>
                      )
                    })
                  }
                </div>
    
                
              </div>
              <div className='w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0'>
                <p className='text-green-700 text-2xl underline'>Pasos</p>
                {
                 pasos?.map((item, index) => (
                  <p className='text-white flex gap-2 bg-[#fff5f518] px-4 py-1 rounded-full ' key={index}>
                    <BsPatchCheck color='green' /> {item}
                  </p>
                ))
                }
              </div>
              
                
            </div>
            <div className='w-full flex flex-col gap-8 py-20 px-4 md:px-10'>
                  <label className="text-white block text-sm font-medium">Comentarios</label>
                    {
                    comentarios?.map((item, index) => (
                    <p className='text-white flex gap-2 bg-[#fff5f518] px-4 py-1 rounded-full ' key={index}>
                    <BsPatchCheck color='black' /> {item}
                    </p>
                    ))
                    }
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-white block text-sm font-medium">Nuevo Comentario</label>
                    <input
                        type="text"
                        name="content"
                        value={commentData.content}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                    disabled={submitting}
                >
                    Crear Comentario
                </button>
                
            </form>
            {/* Mensaje de confirmación */}
            {message && <p className="text-green-500 mt-2">{message}</p>}
            <form onSubmit={handleStep} className="space-y-4">
                <div>
                    <label className="text-white block text-sm font-medium">Paso a Modificar</label>
                    <label htmlFor="nombre" className="text-white mr-2">Ingrese paso a modificar:</label>
                    <input
                        id="nombre"
                        type="text"
                        value={stepAnterior}
                        onChange={handleStepChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-white block text-sm font-medium">Ingrese paso Nuevo:</label>
                    <input
                        type="text"
                        name="instruction"
                        value={stepNuevo}
                        onChange={handleStepNuevo}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
              {recipeData?.owner == user__id ? (
                    <button
                      className="w-full p-2 bg-blue-500 text-white rounded-md"
                    >
                      Modificar Paso
                    </button>
              ) : null}
            </form>

            <form onSubmit={handleing} className="space-y-4">
                <div>
                    <label className="text-white block text-sm font-medium">Ingrediente a Modificar</label>
                    <label htmlFor="nombre" className="text-white mr-2">Ingrese ingrediente a modificar:</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-black text-white"
                            name="ingModi" onChange={handleIngredientChange} value={ingredientData.ingModi}
                        >
                            {ingreMod.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                </div>
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
                <button
                      className="w-full p-2 bg-blue-500 text-white rounded-md"
                    >
                      Modificar Un Ingrediente
                </button>
            </form>
            <form onSubmit={handleIngMod} className="space-y-4">
            <button
                      className="w-full p-2 bg-blue-500 text-white rounded-md"
                    >
                      Actualizar Ingrediente
                </button>
            </form>
          </div>
        </div>
      )
    }

export default RecipeDetail;