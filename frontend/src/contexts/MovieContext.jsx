import { createContext, useState, useContext, useEffect } from "react";
import Favorites from '../pages/Favorites';

const MovieContext = createContext(

    
)

export const useMovieCotext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = uses 
}