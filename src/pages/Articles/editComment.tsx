import axios, { AxiosInstance } from "axios"
import { useState } from "react"

interface comment_prop {
    comment_id: number,
    isPopUp: boolean,
    setIsPopUp: Function,
    article_id: string | undefined
}

export const EditComment = (props: comment_prop) => {
    const [content, setContent] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value)
    }

    const handleSave = () => {
        axios.put(`http://localhost:3001/articles/${props.article_id}/comments/${props.comment_id}`, {
            comment: {
                content: content
            }
        }, {withCredentials: true})
        .then((res: any) => {
            window.location.reload()
        })
        .catch(err => console.log(err))
        props.setIsPopUp(false)
    }
    return (<div>
        <h3>Edit Comment</h3>
        <input onChange={handleChange} value={content} placeholder="New Edit" />
        <button onClick={handleSave}>Save</button>
    </div>)
}