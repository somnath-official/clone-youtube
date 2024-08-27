import { NavLink } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Avatar } from "./Avatar"

export const Navigation = () => {
    const { isLoggedIn } = useAuth()

    return (
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/videos'>Videos</NavLink></li>
            {
                isLoggedIn
                ?   <Avatar />
                :   <li><NavLink to='/login'>Sign In</NavLink></li>
            }
        </ul>
    )
}
