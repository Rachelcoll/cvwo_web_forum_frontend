import { Navbar } from "../navbar"

interface props {
    loggedInStatus: string,
    user: {[key: string]: string | number | undefined},
    setUser: Function, 
    setLoggedInStatus: Function
}

export const RatingGames = (props: props) => {
    return (<div>
        <div>
        <Navbar loggedInStatus={props.loggedInStatus} setLoggedInStatus={props.setLoggedInStatus} user={props.user}
                setUser={props.setUser} />
        </div>
        <h2>you can rate games here!</h2>
    </div>)
}