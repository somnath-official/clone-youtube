import { Link } from "react-router-dom"
import { Navigation } from "./Navigation"

export const Header = () => {
  return (
    <header className="heading">
      <nav className="heading-wrapper">
        <h3>
          <Link to='/'>
            PlayTube
          </Link>
        </h3>
        <Navigation />
      </nav>
    </header>
  )
}
