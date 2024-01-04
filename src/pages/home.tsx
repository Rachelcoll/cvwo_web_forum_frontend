import axios from "axios"
import { Wrapper } from "./auth/registration"
import { WrapperLogin } from "./auth/login"
import { useNavigate } from "react-router-dom"

interface state_props {
    loggedInStatus: string, 
    setLoggedInStatus: Function, 
    user: object, 
    setUser:Function
}

export const Home = (props:state_props) => {
    const handleSuccessfulAuth = (data: object) => {
        props.setLoggedInStatus("user logged in")
        props.setUser(data)
    }
    
    return (<div>
    <h1>Home</h1>
    <h1>status: {props.loggedInStatus}</h1>
    <Wrapper handleSuccessfulAuth={handleSuccessfulAuth}/>
    <br/>
    <WrapperLogin handleSuccessfulAuth={handleSuccessfulAuth} />
    <br/>
    <Logout setLoggedInStatus={props.setLoggedInStatus} setUser={props.setUser} />
    </div>
    )
}
interface logout_props {
    setLoggedInStatus: Function,
    setUser:Function
}

export const Logout = (props: logout_props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        axios.delete('http://localhost:3001/logged_out', { withCredentials: true })
        .then(res => {
            props.setLoggedInStatus("not logged in")
            props.setUser({email: ""})
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return <div>
            <button onClick={handleClick}>Logout</button>
    </div>
}