import Logo from '../../assets/svgs/Logo.svg'
import EyeOpen from '../../assets/svgs/EyeOpen.svg'
import EyeClose from '../../assets/svgs/EyeClose.svg'
import { useRef, useState } from 'react'
import { ILoginAuthData } from '../../@types/Auth'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [authData, setAuthData] = useState<ILoginAuthData>({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const handleAuthInputChange = (name: 'email' | 'password', value: string) => {
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
        if (!authData.email) {
            setError('Missing email')
            emailRef.current?.focus()
            return false
        }

        if (!authData.password) {
            setError('Missing password')
            passwordRef.current?.focus()
            return false
        }

        setError('')
        return true
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="left">
                    <div className='platform-info'>
                        <h2>Welcome to PlayTube</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptates alias, eius totam aspernatur fugiat dolores, sed blanditiis facilis nesciunt explicabo similique corrupti quidem earum quia. Cum reiciendis pariatur delectus!</p>
                    </div>
                    <footer>
                        <span className='copyright-text'>Copyright @ 2024</span>
                        <img src={Logo} />
                    </footer>
                </div>
                <div className="right">
                    <div className="form-header">
                        <h2>Sign In</h2>
                    </div>
                    <div className='auth-form'>
                        <div className='input-wrapper'>
                            <input
                                type='email'
                                ref={emailRef}
                                value={authData.email}
                                placeholder='Enter email...'
                                onChange={(e) => handleAuthInputChange('email', e.currentTarget.value)}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <input
                                value={authData.password}
                                ref={passwordRef}
                                data-password
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password...'
                                onChange={(e) => handleAuthInputChange('password', e.currentTarget.value)}
                            />
                            {
                                !showPassword
                                    ? <img className='password-visibility' src={EyeClose} onClick={() => setShowPassword(true)} />
                                    : <img className='password-visibility' src={EyeOpen} onClick={() => setShowPassword(false)} />
                            }
                        </div>

                        {
                            error &&
                            <p className='auth-error'>* {error}</p>
                        }

                        <button
                            onClick={handleAuthAction}
                            disabled={
                                !authData.email ||
                                !authData.password ||
                                isAuthenticating
                            }
                        >
                            Sign In
                        </button>

                        <div className='auth-action'>
                            <p>Forgot Password ?</p>
                            <p>Create account</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
