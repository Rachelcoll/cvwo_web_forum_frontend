import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

interface props {
    loggedInStatus: string,
    user: {[key: string]: string | number | undefined},
    setUser: Function, 
    setLoggedInStatus: Function
}

export const CreatePost = (props: props) => {
    const [tagOption, setTagOption] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault()
        axios.post('http://localhost:3001/articles', {
            article: {
                title: title,
                tag: tagOption,
                body: body
            }
        }, {withCredentials: true})
        .then(res => {
            console.log('post response', res)
            navigate('/dashboard')
            })
        .catch(err => console.log(err))
    }

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTagOption(event.target.value)
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    
    const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }

    if (props.loggedInStatus === "not logged in") {
        return <div>
            <h1>Log in to create new posts</h1>
            <Link to='/'>Login</Link>
        </div>
    }
    return(<div>
        <div>
        <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Title" type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <br/>
                    <label>
                        Choose a tag: 
                        <select value={tagOption} onChange={handleTagChange}>
                            <option value=''>Select...</option>
                            <option value='mobile'>Mobile</option>
                            <option value='console'>Console</option>
                            <option value='steam'>Steam</option>
                        </select>
                    </label>
                </div>
                <div>
                    <br/>
                    <input placeholder="Content" type="text" value={body} onChange={handleBodyChange} />
                </div>
                <br/>
                <button type="submit">Post</button>
            </form>
            </div>
    </div>)
}