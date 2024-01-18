import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

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
        axios.get(`http://localhost:3001/articles/${id}`, { withCredentials: true })
            .then(res => {
                setCurrentPost(res.data.article)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => getCurrentPost(), [id])
    const handleSubmit = (event: React.FormEvent) => {
        event?.preventDefault()
        axios.put(`http://localhost:3001/articles/${id}`, {
            article: {
                title: title,
                tag: tagOption,
                body: body
            }
        }, { withCredentials: true })
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
            <Container className="mt-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
                        <Form.Label column sm={2}>Title</Form.Label>
                        <Col sm={10}>
                            <Form.Control placeholder="Title" type="text" defaultValue={currentPost.title} onChange={handleTitleChange}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Tag</Form.Label>
                        <Col sm={10} >
                            <Form.Select aria-label="Select tag" defaultValue={currentPost.tag} onChange={handleTagChange}>
                                <option>select a tag</option>
                                <option value="mobile">mobile</option>
                                <option value="console">console</option>
                                <option value="steam">steam</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" as={Row}>
                        <Form.Label column sm={2}>Content</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" type="text" defaultValue={currentPost.body} onChange={handleBodyChange} />
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col xs={{ span: 3, offset: 3 }}>
                            <Link to="/dashboard"><Button variant="outline-dark">Back</Button></Link>
                        </Col>
                        <Col xs={{ span: 3 }}>
                            <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Edit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </form>
    </div>)
}