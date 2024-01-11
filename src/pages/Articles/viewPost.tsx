import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { EditComment } from "./editComment"

interface user_prop {
    user: {[key: string]: string | number | undefined}
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

export const ViewPost = (props: user_prop) => {

    const {id} = useParams()
    const [article, setArticle] = useState<Article|null>(null)
    const [author, setAuthor] = useState<string>('')

    const getPost = () => {
        axios.get(`http://localhost:3001/articles/${id}`, {withCredentials: true})
        .then((res) => {
            console.log("article", res)
            setArticle(res.data.article)
            setAuthor(res.data.user.email)
        })
        .catch(err => console.log(err))
        console.log("current_user", props.user)
    }

    useEffect(() => getPost(), [])

    return(<div>
        <h1>{article?.title}</h1>
        <h3>By: {author}</h3>
        <h3>Time: {article?.updated_at}</h3>
        <h3>Tag: {article?.tag}</h3>
        <h2>{article?.body}</h2>
        <Link to='/dashboard'>Back</Link>
        <div className="Comments">
            <h2>Comments</h2>
            <label>send a comment...</label>
            <SendComment />
            <Comments user={props.user}/>
        </div>
    </div>)
}

const Comments = (props:user_prop) => {

    const {id} = useParams()
    const [comment, setComment] = useState<{[key: string]: any}[]>([])
    const [isPopUp, setIsPopUp] = useState<boolean>(false)

    const getComments = () => {
        axios.get(`http://localhost:3001/articles/${id}/comments`, {withCredentials: true})
        .then(res => {
            // console.log('comments of this article', res)
            setComment(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getComments(), [])

    const handleClick = (comment_id: number) => {
        axios.delete(`http://localhost:3001/articles/${id}/comments/${comment_id}`, {withCredentials:true})
        .then(res => {
            console.log("delete result", res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleEditClick = () => {
        setIsPopUp(true)
    }
    
    const commentList = comment?.map((item: {[key: string]: any}) => {
        return (
            <div key={item.comment.id}>
            <h3>Commenter: {item.commenter.email}</h3>
            <h3>Content: {item.comment.content}</h3>
            {props.user.id === item.comment.user_id
            ? <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={() => handleClick(item.comment.id)}>Delete</button>
            </div>
            : null}
            {isPopUp && <EditComment comment_id={item.comment.id} isPopUp={isPopUp} setIsPopUp={setIsPopUp} article_id={id} />}
            </div>)
    })
    return <div>{commentList}</div>
}

const SendComment = () => {
    const {id} = useParams()
    const [content, setContent] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.post(`http://localhost:3001/articles/${id}/comments`, {
            content: content
        }, {withCredentials: true})
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <input placeholder="we encourage friendly discussion" type="text" value={content} onChange={handleChange} />
            <button type="submit">Send</button>
        </form>
    </div>)
}