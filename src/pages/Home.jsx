import React from 'react'
import Cabecera from '../components/Cabecera'
import Recipes from '../components/Recipes'

const Home = ()=> {
    return(
        <main className='w-full flex flex-col'>
            <Cabecera
                title={
                  <p>
                    Mis Sabores
                  </p>
                }
                type='home'
            />
        </main>
    )
}
/*Food Book
                    <br /> My Flavors! */
export default Home