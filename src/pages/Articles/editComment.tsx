import axios, { AxiosInstance } from "axios"
import { useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";


interface comment_prop {
    comment_id: number,
    // isPopUp: boolean,
    // setIsPopUp: Function,
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
        }, { withCredentials: true })
            .then((res: any) => {
                window.location.reload()
            })
            .catch(err => console.log(err))
        // props.setIsPopUp(false)
    }
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
        <TextField fullWidth label="Edit comment" id="fullWidth" onChange={handleChange} value={content} placeholder="New Edit" />
        <Button onClick={handleSave}>Save</Button>
        </Box>)
}