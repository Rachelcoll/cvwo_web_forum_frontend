import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { EditComment } from "./editComment"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Button as Btn } from "@mui/material"
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import Popper from '@mui/material/Popper';



interface user_prop {
    user: { [key: string]: string | number | undefined }
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

    const { id } = useParams()
    const [article, setArticle] = useState<Article | null>(null)
    const [author, setAuthor] = useState<string>('')
    const [likes, setLikes] = useState<number>(0)

    const getPost = () => {
        axios.get(`http://localhost:3001/articles/${id}`, { withCredentials: true })
            .then((res) => {
                console.log("article", res)
                setArticle(res.data.article)
                setAuthor(res.data.user.email)
            })
            .catch(err => console.log(err))
        console.log("current_user", props.user)

    }

    useEffect(() => getPost(), [])

    return (<div>
        <Container className="mt-4">
            <Row style={{ justifyContent: 'center' }}>
                <Col xs={8}><h2>{article?.title}</h2></Col>
            </Row>
            <Row style={{ justifyContent: 'center' }} className="mt-4">
                {article?.updated_at.slice(0, 10)} By: {author}
            </Row>
            <Link to={`/${article?.tag}`}><Btn>{article?.tag}</Btn></Link>
            <Row style={{ justifyContent: 'center' }} className="mt-4">
                {article?.body}
            </Row>
            <Row className="mt-4">
                <Link to='/dashboard'><Button variant="outline-dark">Back</Button></Link>
            </Row>
            <Row className="mt-4">
                <div className="Comments">
                    <SendComment />
                    <Comments user={props.user} />
                </div>
            </Row>
        </Container>
    </div>)
}

const Comments = (props: user_prop) => {

    const { id } = useParams()
    const [comment, setComment] = useState<{ [key: string]: any }[]>([])

    const getComments = () => {
        axios.get(`http://localhost:3001/articles/${id}/comments`, { withCredentials: true })
            .then(res => {
                // console.log('comments of this article', res)
                setComment(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => getComments(), [])

    const handleClick = (comment_id: number) => {
        axios.delete(`http://localhost:3001/articles/${id}/comments/${comment_id}`, { withCredentials: true })
            .then(res => {
                console.log("delete result", res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    const commentList = comment?.map((item: { [key: string]: any }) => {
        const SimplePopper = () => {
            const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

            const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                setAnchorEl(anchorEl ? null : event.currentTarget);
            };

            const open = Boolean(anchorEl);
            const id = open ? 'simple-popper' : undefined;

            return (
                <div>
                    <Btn aria-describedby={id} type="button" onClick={handleClick}>
                        Edit
                    </Btn>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            <EditComment comment_id={item.comment.id} article_id={id} />
                        </Box>
                    </Popper>
                </div>
            );
        }
        return (
            <div key={item.comment.id}>

                <React.Fragment>
                    <Container className="align-items-center justify-content-center">
                        <CardContent>
                            <Typography variant="body1" component="div">
                                {item.commenter.email}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {item.comment.created_at.slice(0, 16)}
                            </Typography>
                            <Typography variant="body2">
                                {item.comment.content}
                            </Typography>
                        </CardContent>
                        {props.user.id === item.comment.user_id
                            ? <div>
                                <SimplePopper />
                                <Btn onClick={() => handleClick(item.comment.id)}>Delete</Btn>
                            </div>
                            : null}
                    </Container>
                </React.Fragment>
            </div>)
    })
    return <div>{commentList}</div>
}

const SendComment = () => {
    const { id } = useParams()
    const [content, setContent] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.post(`http://localhost:3001/articles/${id}/comments`, {
            content: content
        }, { withCredentials: true })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <Container className="align-items-center justify-content-center">
                <FloatingLabel
                    controlId="floatingTextarea2"
                    label=""
                    className="mb-3"
                >
                    <Row style={{ justifyContent: 'center' }}>
                        <Col sm={{ span: 6 }}>
                            <Form.Control as="textarea" placeholder="we encourage friendly discussion" value={content} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: 'center' }} className="mt-4">
                        <Col sm='auto'>
                            <Button type="submit" variant="outline-dark">Send</Button>
                        </Col>
                    </Row>
                </FloatingLabel>
            </Container>
        </form>
    </div>)
}