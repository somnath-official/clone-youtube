import Logo from '../../assets/svgs/Logo.svg'
import EyeOpen from '../../assets/svgs/EyeOpen.svg'
import EyeClose from '../../assets/svgs/EyeClose.svg'
import { useState } from 'react'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="auth-container">
            <div className="login-card">
                <div className="left">
                    <div className='platform-info'>
                        <h2>Welcome to YouTube</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptates alias, eius totam aspernatur fugiat dolores, sed blanditiis facilis nesciunt explicabo similique corrupti quidem earum quia. Cum reiciendis pariatur delectus!</p>
                    </div>
                    <footer>
                        <span className='copyright-text'>Copyright @ 2024</span>
                        <img src={Logo} />
                    </footer>
                </div>
                <div className="right">
                    <h2>Sign In</h2>
                    <form>
                        <div>
                            <div className='input-wrapper'>
                                <input type='email' placeholder='user@example.com' />
                            </div>

                            <div className='input-wrapper'>
                                <input data-password type={showPassword ? 'text' : 'password'} placeholder='Password' />
                                {
                                    !showPassword
                                    ?   <img className='password-visibility' src={EyeClose} onClick={() => setShowPassword(true)} />
                                    :   <img className='password-visibility' src={EyeOpen} onClick={() => setShowPassword(false)} />
                                }
                            </div>

                            <div className='auth-action'>
                                <a href='#' className='create-account'>
                                    <p>Create account</p>
                                </a>
                                <button>Sign In</button>
                            </div>

                            <div className='forgot-password'>
                                <span>Forgot Password</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
