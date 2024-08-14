import React from 'react'
import Cabecera from '../components/Cabecera'

const Home = ()=> {
    return(
        <main className='w-full flex flex-col'>
            <Cabecera
            title={
                <p>
                 MIS SABORES
                </p>
            }
            type='home'
            />
        </main>
        
    )
}

export default Home