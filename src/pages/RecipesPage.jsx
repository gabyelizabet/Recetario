// src/components/RecipesSection.jsx
import React from 'react';
import Recipes from '../components/Recipes';

const RecipesPage = () => {
    return (
        <section id="recipes" className='md:max-w-[1440px] mx-auto px-4 md:px-20 pt-20'>
            <Recipes/>
        </section>
    );
};

export default RecipesPage;
