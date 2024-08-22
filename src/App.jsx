import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/*import {Routes, Route, Outlet} from 'react-router-dom'
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './pages/RecipeDetail';*/

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}
/*function Layout(){
  return (
    <>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </>
  )
}
function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='recipes/:id' element={<RecipeDetail />} />
        </Route>
      </Routes>
    </div>
  );
}*/

export default App;
