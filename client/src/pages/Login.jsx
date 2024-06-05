import { useEffect } from "react"
import Navbar from "../components/Navbar"
import loginStyle from '/src/css/Login.module.css'
import { Link } from 'react-router-dom';

function Login() {
    useEffect(() => {
        // Tab title
        document.title = "Login | OtakuScope"
    }, [])

    return (
        <>
            {/* Nav Bar */}
            <Navbar />

            {/* Main Content */}
            <main id={loginStyle['main-content']}>
                <p id={loginStyle['discover-text']}>Discover and track your favourite anime shows with OtakuScope.</p>

                {/* Login Form */}
                <div id={loginStyle['login-container']}>
                    <h2>Login</h2>
                    <form>
                        {/* User */}
                        <label htmlFor="user">
                            <strong>Email or Username</strong>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Email or Username'
                            autoComplete='off'
                            name='user'
                        />

                        {/* Password */}
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                        />

                        {/* Login Button */}
                        <button type='submit' id={loginStyle['login-btn']}>
                            Login
                        </button>
                    </form>

                    {/* Sign Up button that links to register page */}
                    <p>Don't have an account?</p>

                    <Link to="/signup" id={loginStyle['register-grey-btn']}>
                        Sign Up
                    </Link>
                </div>
            </main>
        </>
    )
}

export default Login