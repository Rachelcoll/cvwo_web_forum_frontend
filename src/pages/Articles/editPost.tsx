import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const EditPost = () => {
    const { id } = useParams()
    const [currentPost, setCurrentPost] = useState<{ [key: string]: any }>({})
    const [tagOption, setTagOption] = useState(currentPost.tag)
    const [title, setTitle] = useState(currentPost.title)
    const [body, setBody] = useState(currentPost.body)
    const navigate = useNavigate()

    const getCurrentPost = () => {
        if (!id) {
            console.log("error")
            return 
        }
        axios.get(`http://localhost:3001/articles/${id}`, {withCredentials: true})
        .then(res => {
            setCurrentPost(res.data.article)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getCurrentPost(), [id])
    const handleSubmit = (event:React.FormEvent) => {
        event?.preventDefault()
        axios.put(`http://localhost:3001/articles/${id}`, {
            article: {
                title: title,
                tag: tagOption,
                body: body
            }
        }, {withCredentials: true})
             .then(res => {
                console.log(res)
                navigate('/dashboard')
                window.location.reload()
             })
             .catch(err => console.log(err))
    }
    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== currentPost.tag) {
            setTagOption(event.target.value)
        } else {
            setTagOption(currentPost.tag)
        }
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    
    const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }

    return (<div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Title" type="text" defaultValue={currentPost.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <br/>
                    <label>
                        Choose a tag: 
                        <select defaultValue={currentPost.tag} onChange={handleTagChange}>
                            <option value=''>Select...</option>
                            <option value='Mobile'>Mobile</option>
                            <option value='NS'>Switch</option>
                            <option value='PlayStation'>PlayStation</option>
                        </select>
                    </label>
                </div>
                <div>
                    <br/>
                    <input placeholder="Content" type="text" defaultValue={currentPost.body} onChange={handleBodyChange} />
                </div>
                <br/>
                <button type="submit">Post</button>
            </form>
            </div>)
}