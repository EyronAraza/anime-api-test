import { createContext, useEffect, useReducer, useState } from 'react'
import { useContext } from 'react'

const GlobalContext = createContext()

const baseApiUrl = "https://api.jikan.moe/v4"

// Action Types
const LOADING = "LOADING"
const SEARCH = "SEARCH"
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME"
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME"
const GET_AIRING_ANIME = "GET_AIRING_ANIME"

// Reducer Action Types to update states
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false }
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false }
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false }
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false }
        default:
            return state
    }
}

// Create Global Provider
export const GlobalProvider = ({ children }) => {
    // Store access to server/back-end side
    const SERVER_URL = "http://localhost:5000"

    // Initial state
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false
    }

    // Store search
    const [search, setSearch] = useState('')

    // Create use reducer to handle and manipulate multiple states
    // Dispatch is used to send the data and the reducer will update and store to initialState variables
    const [state, dispatch] = useReducer(reducer, initialState)

    // Handle change from search bar
    const handleChange = (e) => {
        setSearch(e.target.value)
        // If user search empty, display popular animes instead 
        if (e.target.value === '') {
            state.isSearch = false
        }
    }

    // Handle submit from search bar
    const handleSubmit = (e) => {
        e.preventDefault() // prevent browser refresh
        // Check if there are input characters in search
        if (search) {
            searchAnime(search)
            state.isSearch = true
        } else {
            state.isSearch = false
            alert("Please enter a search term")
        }
    }

    // Fetch popular anime
    const getPopularAnime = async () => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseApiUrl}/top/anime?filter=bypopularity&sfw`)
        const data = await response.json()
        dispatch({ type: GET_POPULAR_ANIME, payload: data.data })
    }

    // Fetch upcoming anime
    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseApiUrl}/top/anime?filter=upcoming&sfw`)
        const data = await response.json()
        dispatch({ type: GET_UPCOMING_ANIME, payload: data.data })
    }

    // Fetch airing anime
    const getAiringAnime = async () => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseApiUrl}/top/anime?filter=airing&sfw`)
        const data = await response.json()
        dispatch({ type: GET_AIRING_ANIME, payload: data.data })
    }

    // Fetch anime by search (sorted by popular and ascending order)
    const searchAnime = async (anime) => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseApiUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`)
        const data = await response.json()
        dispatch({ type: SEARCH, payload: data.data })
    }

    // Initial render (to display popular anime first at home page)
    useEffect(() => {
        getPopularAnime()
    }, [])

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getAiringAnime,
            getUpcomingAnime,
            SERVER_URL
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Create to use global context
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}