
export async function fetchRecipes (filter){
    const {query, limit} = filter;

    const url = `https://sandbox.academiadevelopers.com/reciperover/categories/${query}`;

    const response = await fetch(url)

    const data = await response.json();

    /*const recipes = data.recipes;
    const name = data.name;
    console.log(name)
    console.log(recipes)*/

    return data?.recipes;
    //return data?.name;
}

export async function fetchRecipe(id){
const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/${id}`;

const response = await fetch(url)

const data = await response.json();
//console.log(data)

return data;
}

export async function fetchIngredients(id){
    const url = `https://sandbox.academiadevelopers.com/reciperover/ingredients/${id}`;
    
    const response = await fetch(url)
    
    const data = await response.json();
    return data?.name;
    }

    export async function fetchCategorias (){
        const url = `https://sandbox.academiadevelopers.com/reciperover/categories/`;
    
        const response = await fetch(url)
    
        const data = await response.json();
        return data?.results;
    }

    export async function fetchPasos (id_recipe){
        const url = `https://sandbox.academiadevelopers.com/reciperover/steps/?recipe=${id_recipe}`;
    
        const response = await fetch(url)
    
        const data = await response.json();
        return data?.results;
    }

    export async function fetchComentarios (id){
        const url = `https://sandbox.academiadevelopers.com/reciperover/comments/?recipe=${id}`;
    
        const response = await fetch(url)
    
        const data = await response.json();
        console.log(data)
        return data?.results;
    }

    export async function fetchCant_Uni (id_recipe){
        const url = `https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/?recipe=${id_recipe}`;
    
        const response = await fetch(url)
    
        const data = await response.json();
        return data?.results;
    }