import { NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Navigation = () => {
    const { isLoggedIn } = useAuth()
    return (
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            {
                isLoggedIn
                ?   <>
                        <li><NavLink to='/profile'>Profile</NavLink></li>
                        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                        <li>Logout</li>
                    </>
                :   <>
                        <li><NavLink to='/login'>Sign In</NavLink></li>
                        <li><NavLink to='/register'>Sign Up</NavLink></li>
                    </>
            }
        </ul>
    )
}
