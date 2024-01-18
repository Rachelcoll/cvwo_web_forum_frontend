import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { useSelector } from "react-redux"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Button, createTheme } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Dashboard = () => {

    return (<div>
        <Articles tag="all" />
    </div>)
}


const DashboardNavbar = () => {
    return (<div>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand>Dashboard</Navbar.Brand>
                <Navbar.Text>Create new post, see posts under different tags</Navbar.Text>
                <div>
                    <Nav className="justify-content-center" style={{ flex: 1 }}>
                        <Nav.Link as={Link} to={'/createPost'}><Button>Create New Post</Button></Nav.Link>
                    </Nav>
                </div>
            </Container>
        </Navbar>
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
    const rev_articles = articles?.sort((a, b) => b.id - a.id)
    const FormatArticles = rev_articles.map(item => {
        return <div key={item.id}>
            <Container>
                <Row style={{ justifyContent: 'center' }}>
                    <Card className="text-center">
                    <Card.Footer className="text-muted">{item.updated_at.slice(0, 10)}</Card.Footer>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <br/>
                            <Card.Subtitle>Tag: {item.tag}</Card.Subtitle>
                            <br/>
                            <Card.Text>{item.body}</Card.Text>
                            <Card.Link as={Link} to={`/viewPost/${item.id}`} ><Button>View</Button></Card.Link>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    })

    return (<div>
        <div>
            <DashboardNavbar />
            <div>
                <Link to='/all'><Button>All</Button></Link>
                <Link to='/mobile'><Button>Mobile</Button></Link>
                <Link to='/console'><Button>Console</Button></Link>
                <Link to='/steam'><Button>Steam</Button></Link>
            </div>

        </div>
        {FormatArticles}
    </div>)

}