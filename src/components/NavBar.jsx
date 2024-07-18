import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div>
                <ul>
                    <NavLink to="/">Home</NavLink>
                </ul>
                <ul>
                    <NavLink to='/pricing'>Pricing</NavLink>
                </ul>
                <ul>
                    <NavLink to="/products">Products</NavLink>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
