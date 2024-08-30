// ModificarReceta.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ModificarPaso() {
    const { idRecipe } = useParams();
    const navigate = useNavigate();
    const [stepData, setStepData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    console.log(idRecipe)

    useEffect(() => {
        fetch(`https://sandbox.academiadevelopers.com/reciperover/steps/${idRecipe}/`)
            .then(response => response.json())
            .then(data => {
                setStepData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching step data:', error);
                setIsError(true);
                setIsLoading(false);
            });
    }, [idRecipe]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://sandbox.academiadevelopers.com/reciperover/steps/${idRecipe}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`, // Asegúrate de tener el token disponible
            },
            body: JSON.stringify({
                description: stepData.description,
                // Otros campos que necesites actualizar
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Step updated:', data);
                navigate(`/receta/${data.recipe_id}`); // Redirige a la página de la receta
            })
            .catch(error => {
                console.error('Error updating step:', error);
            });
    };

    if (isLoading) return <p>Cargando paso...</p>;
    if (isError) return <p>Error al cargar el paso.</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Descripción:
                <input
                    type="text"
                    value={stepData.description}
                    onChange={(e) => setStepData({ ...stepData, description: e.target.value })}
                />
            </label>
            <button type="submit">Guardar cambios</button>
        </form>
    );
}

export default ModificarPaso;
  