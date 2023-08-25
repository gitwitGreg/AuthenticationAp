import logo from '../assets/l.png'
import '../Style.css/Nav.css'

const Navbar = () => {
  return (
    <div className='nav'>
        <a href='logo'><img src={logo} height={40} width={40} /></a>
        <div className='nav-options'>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Signup</li>
                <button>Log in</button>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
