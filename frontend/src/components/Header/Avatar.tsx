import { useEffect, useRef } from "react"
import { useAuth } from "../../hooks/useAuth"
import { NavLink, useNavigate } from "react-router-dom"
import LogoutIcon from '../../assets/svgs/Logout.svg'
import DashboardIcon from '../../assets/svgs/Dashboard.svg'
import AccountIcon from '../../assets/svgs/Account.svg'

export const Avatar = () => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const menuWrapper = useRef<HTMLLIElement | null>(null)
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  const getProfileImage = () => {
    if (user?.avatar)
      return <img src={user.avatar} data-avatar />

    const name = user?.name || ''
    let initials = 'N/A'

    if (name.split(' ').length === 1) initials = `${(name.split(' ')[0]).charAt(0)}`
    else if (name.split(' ').length === 2) initials = `${(name.split(' ')[0]).charAt(0)}${(name.split(' ')[1]).charAt(0)}`

    return <div data-avatar>{initials}</div>
  }

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show')
    }
  }

  const handleLogout = async () => {
    await logOut()
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const checkClickAway = (e: MouseEvent) => {
      if (
        e.target === menuRef.current ||
        e.target === menuWrapper.current ||
        e.target === menuWrapper.current?.querySelector('div[data-avatar]') ||
        e.target === menuWrapper.current?.querySelector('img[data-avatar]')
      ) return

      if (menuRef.current) menuRef.current.classList.remove('show')
    }

    document.addEventListener('click', checkClickAway)

    return () => {
      document.removeEventListener('click', checkClickAway)
    }
  }, [])

  return (
    <li ref={menuWrapper} className="nav-avatar" onClick={toggleMenu}>
      {getProfileImage()}

      <div className="menu" ref={menuRef}>
        <NavLink to='/profile'>
          <div className="items">
            <img src={AccountIcon} />
            <span>Profile</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard'>
          <div className="items">
            <img src={DashboardIcon} />
            <span>Dashboard</span>
          </div>
        </NavLink>
        <div className="items" onClick={handleLogout}>
          <img src={LogoutIcon} />
          <span>Logout</span>
        </div>
      </div>
    </li>
  )
}
