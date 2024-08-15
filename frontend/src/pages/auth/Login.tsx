import Logo from '../../assets/svgs/Logo.svg'
import EyeOpen from '../../assets/svgs/EyeOpen.svg'
import EyeClose from '../../assets/svgs/EyeClose.svg'
import { useRef, useState } from 'react'
import { ILoginAuthData } from '../../@types/Auth'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [authData, setAuthData] = useState<ILoginAuthData>({
        username: '',
        password: ''
    })
    const [error, setErro] = useState('')
    const userNameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const handleAuthInputChange = (name: 'username' | 'password', value: string) => {
        const t: ILoginAuthData = JSON.parse(JSON.stringify(authData))
        t[name] = value
        setAuthData(t)
    }

    const handleAuthAction = () => {
        try {
            setIsAuthenticating(true)
            if (validateAuthData()) {
                console.log(authData)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsAuthenticating(false)
        }
    }

    const validateAuthData = (): boolean => {
        if (!authData.username) {
            setErro('Missing username or email')
            userNameRef.current?.focus()
            return false
        }

        if (!authData.password) {
            setErro('Missing password')
            passwordRef.current?.focus()
            return false
        }

        setErro('')
        return true
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
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
                    <div className='auth-form'>
                        <div className='input-wrapper'>
                            <input
                                type='text'
                                ref={userNameRef}
                                value={authData.username}
                                placeholder='Username or Email'
                                onChange={(e) => {
                                    handleAuthInputChange('username', e.currentTarget.value)
                                }}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <input
                                value={authData.password}
                                ref={passwordRef}
                                data-password
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                onChange={(e) => {
                                    handleAuthInputChange('password', e.currentTarget.value)
                                }}
                            />
                            {
                                !showPassword
                                ?   <img className='password-visibility' src={EyeClose} onClick={() => setShowPassword(true)} />
                                :   <img className='password-visibility' src={EyeOpen} onClick={() => setShowPassword(false)} />
                            }
                        </div>

                        {
                            error &&
                            <p className='auth-error'>* {error}</p>
                        }

                        <button
                            onClick={handleAuthAction}
                            disabled={
                                !authData.username ||
                                !authData.password ||
                                isAuthenticating
                            }
                        >
                            Sign In
                        </button>
                        
                        <div className='auth-action'>
                            <p>Create account</p>
                            <p>Forgot Password</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
