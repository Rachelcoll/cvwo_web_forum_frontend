import { Navbar } from "../navbar"
import { Moblie } from "./tags/moblie"
import { Playstation } from "./tags/playstation"
import { NS } from "./tags/NS"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { JsonObjectExpression } from "typescript"

interface props {
    loggedInStatus: string,
    user: {[key: string]: string | number | undefined},
    setUser: Function, 
    setLoggedInStatus: Function
}
export const Dashboard = (props: props) => {

    
    return (<div>
        <div>
            <Navbar loggedInStatus={props.loggedInStatus} user={props.user} 
            setUser={props.setUser} setLoggedInStatus={props.setLoggedInStatus}/>
        </div>
    
        <div>
            <h1>Dashboard</h1>
            <DashboardNavbar />
            <DashboardContent />
        </div>
    </div>)
}

const DashboardNavbar = () => {
    return (<div>
        <h2>This is Dashboard Navbar.
        Create new post, see posts under different tags, jump to rating area to rate games.</h2>
        <Link to='/rating'>Rate games</Link>
        <Link to='/createPost'>New Post</Link>
    </div>)
}

const DashboardContent = () => {
    return (<div>
        <h2>Here are the posts.</h2>
        <Articles/>
    </div>)
}


const Articles = () => {

    const [articles, setArticles] = useState<any>()
    const handleTest = () => {
        axios.get('http://localhost:3001/articles', {withCredentials: true})
        .then((res: AxiosResponse) => {
            setArticles(res.data)
            console.log(res.data)

        })
        .catch(err=>console.log(err))
    }

    useEffect(() => handleTest(), [])

    const FormatArticles = articles?.map((item: 
        {article: {[key: string]: string | number | undefined}}) => {
        return <div key={item.article.id}>
            <h2>Titile: {item.article.title}</h2>
            <h3>Tag: {item.article.tag}</h3>
            <h3>Body: {item.article.body}</h3>
        </div>
    })

    return FormatArticles
    
}