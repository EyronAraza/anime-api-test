import { useState } from 'react'
import logoImg from '/src/assets/logo-img.png'
import navbarStyle from '/src/css/Navbar.module.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    // Use global context
    const { handleSubmit, search, searchAnime, handleChange } = useGlobalContext()

    return (
        <nav id={navbarStyle['main-nav']}>
            {/* Logo (clicking this will refresh page)*/}
            <Link to='/home' id={navbarStyle['link-img']}>
                <img src={logoImg} alt="Logo" id={navbarStyle['logo-img']} />
            </Link>

            {/* Searchbar */}
            <form id={navbarStyle['searchbar-container']} onSubmit={handleSubmit}>
                <input type="text" placeholder='Search Anime ...' value={search} onChange={handleChange} />
                <button id={navbarStyle['searchbar-btn']} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>

            {/* Login button */}
            <Link to='/login' id={navbarStyle['login-btn']} onClick={() => {
                setTimeout(() => {
                    toast("Bruh", { toastId: 'prevent-dupe' })
                }, 1)
            }}>Login / Sign Up</Link>

            {/* User Display */}

            {/* Customize Toaster */}
            <ToastContainer
                // toastStyle={{ backgroundColor: "#12B59B" }}
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover={false}
                theme="dark" />
        </nav>
    )
}

export default Navbar