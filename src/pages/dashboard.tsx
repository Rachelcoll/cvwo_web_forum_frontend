import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { useSelector } from "react-redux"

export const Dashboard = () => {

    return (<div>
        <Articles tag="all" />
    </div>)
}

const DashboardNavbar = () => {
    return (<div>
        <h2>Welcome to EmagamE!</h2>
        <h2>Create new post, see posts under different tags, jump to rating area to rate games.</h2>
        <ul>
            <Link to='/createPost'>New Post</Link>
        </ul>
    </div>)
}

interface tagProps {
    tag: string
}

interface Article {
    body: string,
    created_at: string,
    id: number,
    tag: string,
    title: string,
    updated_at: string,
    user_id: number
}

export const Articles = (props: tagProps) => {
    const [articles, setArticles] = useState<Article[]>([])
    const handleTest = () => {
        axios.get(`http://localhost:3001/articles/tag/${props.tag}`, { withCredentials: true })
            .then((res: AxiosResponse) => {
                setArticles(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        handleTest()
    }, [props.tag])

    const FormatArticles = articles?.map(item => {
        return <div key={item.id}>
            <h2>Titile: {item.title}</h2>
            <h3>Time: {item.updated_at}</h3>
            <h3>Tag: {item.tag}</h3>
            <h3>Body: {item.body}</h3>
            <Link to={`/viewPost/${item.id}`}>Check</Link>
        </div>
    })

    return (<div>
        <div>
            <div>
                <h1>Dashboard</h1>
            </div>
            <DashboardNavbar />
            <div>
                <h2>View By Tags</h2>
                <Link to='/all'>All</Link>
                <Link to='/mobile'>Mobile</Link>
                <Link to='/console'>Console</Link>
                <Link to='/steam'>Steam</Link>
            </div>
        </div>
        {FormatArticles}
        </div>)

}