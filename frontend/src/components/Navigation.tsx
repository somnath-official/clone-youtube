import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li>
                <NavLink to='/login'>Sign In</NavLink>
            </li>
            <li>
                <NavLink to='/register'>Sign Up</NavLink>
            </li>
        </ul>
    )
}
