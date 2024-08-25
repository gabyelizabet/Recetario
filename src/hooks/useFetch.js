import { useState } from "react";

function useFetch(initialUrl, initialOptions = {}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    function doFetch(url = initialUrl, options = initialOptions) {
        setIsLoading(true);
        setIsError(null);

        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error ("Error al obtener datos");
                }
                if (response.status === 204) {
                    new Promise(
                        () => {
                            return {
                                message: " Recurso eliminado",
                            };
                        },
                        () => {
                            throw Error("Error al obtener datos");
                        }
                    );
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setIsError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { data, isLoading, isError, doFetch};
}

export default useFetch;

/*export async function fetchRecipes (filter){
    const {query, limit} = filter;

    const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=${limit}&`;


    const response = await fetch(url)

    const data = await response.json();

    return data?.hits;
}

export async function fetchRecipe(id){
const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`

const response = await fetch(url)

const data = await response.json();

return data[0];
}*/