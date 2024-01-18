import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Container, Form, Row, Col, Button } from "react-bootstrap"

interface props {
    loggedInStatus: string,
    user: { [key: string]: string | number | undefined },
    setUser: Function,
    setLoggedInStatus: Function
}

export const CreatePost = (props: props) => {
    const [tagOption, setTagOption] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        axios.post('http://localhost:3001/articles', {
            article: {
                title: title,
                tag: tagOption,
                body: body
            }
        }, { withCredentials: true })
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
    return (<div>
        <Container className="mt-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Tag</Form.Label>
                    <Col sm={10} >
                        <Form.Select aria-label="Select tag" value={tagOption} onChange={handleTagChange}>
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
                        <Form.Control as="textarea" type="text" value={body} onChange={handleBodyChange} rows={3} placeholder="What do you want to say..." />
                    </Col>
                </Form.Group>
                <Row>
                    <Col xs={{span:3, offset:3}}>
                        <Link to="/dashboard"><Button variant="outline-dark">Back</Button></Link>
                    </Col>
                    <Col xs={{span: 3}}>
                        <Button variant="outline-dark" type="submit">Post</Button>
                    </Col>
                </Row>
            </Form>
        </Container>

    </div>)
}