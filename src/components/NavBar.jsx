import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div>
                <ul>
                    <Link to="/">Home</Link>
                </ul>
                <ul>
                    <Link to='/pricing'>Pricing</Link>
                </ul>
                <ul>
                    <Link to="/products">Products</Link>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
