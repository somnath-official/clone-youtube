import { NavLink } from 'react-router-dom'
import Logo from '../assets/svgs/Logo.svg'

export const PageNotFound = () => {
    return (
        <div className="page-not-found-container">
            <div className="box">
                <small>PlayTube</small>

                <h1>404</h1>

                <div className="info-text">
                    <p>The link you clicked may be broken or the</p>
                    <p>page may have been removed.</p>
                </div>

                <div className="footer-text">
                    Return to <NavLink to="/">home page</NavLink>
                </div>
                
                <img className="app-logo" src={Logo} />
            </div>
        </div>
    )
}
