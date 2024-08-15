import Logo from '../../assets/svgs/Logo.svg'
import EyeOpen from '../../assets/svgs/EyeOpen.svg'
import EyeClose from '../../assets/svgs/EyeClose.svg'
import { useRef, useState } from 'react'
import { IRegisterAuthData } from '../../@types/Auth'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [authData, setAuthData] = useState<IRegisterAuthData>({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleAuthInputChange = (name: 'name' | 'email' | 'password', value: string) => {
    const t: IRegisterAuthData = JSON.parse(JSON.stringify(authData))
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
    if (!authData.name) {
      setError('Missing name')
      nameRef.current?.focus()
      return false
    }

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
          <div>
            <div className='form-header'>
              <h2>Sign Up</h2>
            </div>
            <div className='auth-form'>
              <div className='input-wrapper'>
                <input
                  ref={nameRef}
                  value={authData.name}
                  type='text'
                  placeholder='Enter name...'
                  name='name'
                  onChange={(e) => {
                    handleAuthInputChange('name', e.currentTarget.value)
                  }}
                />
              </div>

              <div className='input-wrapper'>
                <input
                  ref={emailRef}
                  value={authData.email}
                  type='email'
                  name='email'
                  placeholder='Enter email...'
                  onChange={(e) => {
                    handleAuthInputChange('email', e.currentTarget.value)
                  }}
                />
              </div>

              <div className='input-wrapper'>
                <input
                  value={authData.password}
                  ref={passwordRef}
                  data-password
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password...'
                  onChange={(e) => {
                    handleAuthInputChange('password', e.currentTarget.value)
                  }}
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
                  !authData.name ||
                  !authData.email ||
                  !authData.password ||
                  isAuthenticating
                }
              >
                Create account
              </button>

              <div className='auth-action'>
                <p></p>
                <p>Login instead</p>
              </div>
            </div>
          </div>

          <footer>
            <span className='copyright-text'>Copyright @ 2024</span>
            <img src={Logo} />
          </footer>
        </div>
      </div>
    </div>
  )
}
