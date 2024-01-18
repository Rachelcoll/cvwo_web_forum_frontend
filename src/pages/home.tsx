import axios from "axios"
import { Wrapper } from "./auth/registration"
import { WrapperLogin } from "./auth/login"
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"
import { CardHeader, Row } from "react-bootstrap"

interface state_props {
    loggedInStatus: string,
    setLoggedInStatus: Function,
    user: object,
    setUser: Function
}

export const Home = (props: state_props) => {
    const handleSuccessfulAuth = (data: object) => {
        props.setLoggedInStatus("user logged in")
        props.setUser(data)
    }

    return (<div>
        <Row className="mt-4">
        <CardHeader><Typography variant="h3" gutterBottom>Welcome to EgamagE, a game discussion forum! </Typography></CardHeader>
        </Row>
        {props.loggedInStatus === "not logged in"
        ? <div>
            <Wrapper handleSuccessfulAuth={handleSuccessfulAuth} />
            <br />
            <WrapperLogin handleSuccessfulAuth={handleSuccessfulAuth} />
        </div>
        : <CardHeader><Typography variant="subtitle1" gutterBottom>You are login, move to dashboard to see posts</Typography></CardHeader>
        }
    </div>
    )
}
interface logout_props {
    setLoggedInStatus: Function,
    setUser: Function
}

export const Logout = (props: logout_props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        axios.delete('http://localhost:3001/logged_out', { withCredentials: true })
            .then(res => {
                props.setLoggedInStatus("not logged in")
                props.setUser({ email: "" })
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return <div>
        <Button onClick={handleClick}>Logout</Button>
    </div>
}