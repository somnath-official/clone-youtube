import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Navigation = () => {
    const { isLoggedIn, logOut } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await logOut()
            navigate('/', {replace: true})
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            {
                isLoggedIn
                ?   <>
                        <li><NavLink to='/profile'>Profile</NavLink></li>
                        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                        <li>
                            <span onClick={logout}>Logout</span>
                        </li>
                    </>
                :   <>
                        <li><NavLink to='/login'>Sign In</NavLink></li>
                        <li><NavLink to='/register'>Sign Up</NavLink></li>
                    </>
            }
        </ul>
    )
}
