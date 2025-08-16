import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'

function App() {

  return (
    <div>
      <NavBar />
    <main className='main-content'>
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/favorites' element={ <Favorites /> }/>
    </Routes>
    </main>
    </div>

  );
}


export default App
