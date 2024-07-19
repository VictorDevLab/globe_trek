import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function Homepage() {
  return (
    <div>
      <NavBar />
      <h1>WorldTrek Home page</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
