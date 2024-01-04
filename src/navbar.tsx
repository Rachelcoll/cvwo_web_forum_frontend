import { Link } from "react-router-dom"
import { Logout } from "./pages/home"

interface state_props {
    loggedInStatus: string, 
    user: {[key: string]: string | number | undefined},
    setUser: Function, 
    setLoggedInStatus: Function
}

export const Navbar = (props: state_props) => {
    if (props.loggedInStatus === "user logged in") {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <h2>Welcome, you're logged in!</h2>
                        </li>
                        <li>
                            <Link to={`/profile/${props.user.id}`}>My Profile</Link>
                        </li>
                        <li>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <br/>
                        <li>
                            <Logout setLoggedInStatus={props.setLoggedInStatus} setUser={props.setUser} />
                        </li>
                    </ul>
                </nav>
            </div>
        )      
    } else {
        return(
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Please log in</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}