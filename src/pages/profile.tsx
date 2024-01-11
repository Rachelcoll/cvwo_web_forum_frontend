import { Link, useNavigate, useParams } from "react-router-dom"
import { NavbarHome } from "../navbar";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface state_props {
    loggedInStatus: string,
    user: {[key: string]: string | number | undefined},
    setUser: Function, 
    setLoggedInStatus: Function
}

export const Profile = (props: state_props) => {
    const { id } = useParams();


    if (props.loggedInStatus === "user logged in") {
        if ( id === props.user.id?.toString()) {
            return (<div>
                {/* <div>
                    <Navbar loggedInStatus={props.loggedInStatus} user={props.user} setUser={props.setUser} setLoggedInStatus={props.setLoggedInStatus} />
                </div> */}
                <div>
                    <h1>User: {props.user.email}</h1>
                    <h2>My posts</h2>
                    <MyArticles/>
                    <br/>
                    <h2>My games</h2>
                    <MyGames />
                </div>
            </div>)   
        } else {
            return <div>
                <h1>Not Accessible To Other User Profile</h1>
                </div>
        }
    } else {
        return <div>
            <h1>Please Login First</h1>
        </div>
    }
}



const MyArticles = () => {

    const [myArticle, setMyArticle] = useState<any>()
    const navigate = useNavigate()
    const handleTest = () => {
        axios.get('http://localhost:3001/personal_article', {withCredentials: true})
        .then((res: AxiosResponse) => {
            console.log(res)
            setMyArticle(res.data)
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => handleTest(), [])

    const handleDelete = (id:any) => {
        axios.delete(`http://localhost:3001/articles/${id}`, {withCredentials: true})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const DisplayArticle = myArticle?.map((item: 
        {article: {[key: string]: string | number | undefined}}) => {
        return <div key={item.article.id}>
            <h2>Title: {item.article.title}</h2>
            <h2>Tag: {item.article.tag}</h2>
            <h3>Body: {item.article.body}</h3>
            <Link to={`/editPost/${item.article.id}`}>Edit</Link>
            <button onClick={() => {
                handleDelete(item.article.id)
                window.location.reload()
                }}>Delete</button>
        </div>
    })
    return DisplayArticle
    
}

interface Game {
    id: number,
    name:string,
    release_date:string,
    developers:string,
    genre:string,
    created_at:string,
    updated_at:string
}

const MyGames = () => {
    const {id} = useParams()
    const [games, setGames] = useState<{game: Game}[]>([])
    const getGames = () => {
        axios.get(`http://localhost:3001/${id}/games`, {withCredentials: true})
        .then(res => {
            console.log(res)
            setGames(res.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => getGames, [])

    const names = games.map(item => {
        return item.game.name
    })

    const namesNoRepeat = [...new Set(names)]
    const gameList = namesNoRepeat?.map(item => {
        return (<div key={item}>
            <ul>
            <h3>{item}</h3>
            </ul>
        </div>)
    })
    return <div>{gameList}</div>
}