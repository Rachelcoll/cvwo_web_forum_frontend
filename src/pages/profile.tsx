import { Link, useNavigate, useParams } from "react-router-dom"
import { NavbarHome } from "../navbar";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardBody, CardText, Container, Row, Card } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

interface state_props {
    loggedInStatus: string,
    user: { [key: string]: string | number | undefined },
    setUser: Function,
    setLoggedInStatus: Function
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function UserTab(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="My posts" {...a11yProps(0)} />
                    <Tab label="My games" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <UserTab value={value} index={0}>
                <MyArticles />
            </UserTab>
            <UserTab value={value} index={1}>
                <MyGames />
            </UserTab>
        </Box>
    );
}

export const Profile = (props: state_props) => {
    const { id } = useParams();


    if (props.loggedInStatus === "user logged in") {
        if (id === props.user.id?.toString()) {
            return (<div>
                <Container>
                    <div>
                        <br />
                        <AccountCircleIcon fontSize="large" />
                    </div>
                    <Row className="mt-4" style={{ justifyContent: 'center' }}>
                        hi, {props.user.email}
                    </Row>
                    <ProfileTabs />
                </Container>
            </div>)
        } else {
            return <div>
                <CardText>Not Accessible To Other User Profile</CardText>
            </div>
        }
    } else {
        return <div>
            <CardText>Please Login First</CardText>
        </div>
    }
}



const MyArticles = () => {

    const [myArticle, setMyArticle] = useState<any>()
    const navigate = useNavigate()
    const handleTest = () => {
        axios.get('http://localhost:3001/personal_article', { withCredentials: true })
            .then((res: AxiosResponse) => {
                console.log(res)
                setMyArticle(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => handleTest(), [])

    const handleDelete = (id: any) => {
        axios.delete(`http://localhost:3001/articles/${id}`, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const DisplayArticle = myArticle?.map((item:
        { article: { [key: string]: string | number | undefined } }) => {
            const time = item.article.updated_at as string
        return <div key={item.article.id}>
            {/* <h2>Title: {item.article.title}</h2>
            <h2>Tag: {item.article.tag}</h2>
            <h3>Body: {item.article.body}</h3>
            <Link to={`/editPost/${item.article.id}`}>Edit</Link>
            <button onClick={() => {
                handleDelete(item.article.id)
                window.location.reload()
            }}>Delete</button> */}
            <Container>
                <Row style={{ justifyContent: 'center' }}>
                    <Card className="text-center">
                        <Card.Footer className="text-muted">{time.slice(0, 10)}</Card.Footer>
                        <Card.Body>
                            <Card.Title>{item.article.title}</Card.Title>
                            <br />
                            <Card.Subtitle>Tag: {item.article.tag}</Card.Subtitle>
                            <br />
                            <Card.Text>{item.article.body}</Card.Text>
                            <Card.Link as={Link} to={`/viewPost/${item.article.id}`} ><Button>View</Button></Card.Link>
                            <Card.Link as={Link} to={`/editPost/${item.article.id}`}><Button>Edit</Button></Card.Link>
                            <Button onClick={() => {
                                handleDelete(item.article.id)
                                window.location.reload()
                            }}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    })
    return DisplayArticle

}

interface Game {
    id: number,
    name: string,
    release_date: string,
    developers: string,
    genre: string,
    created_at: string,
    updated_at: string
}

const MyGames = () => {
    const { id } = useParams()
    const [games, setGames] = useState<{ game: Game }[]>([])
    const getGames = () => {
        axios.get(`http://localhost:3001/${id}/games`, { withCredentials: true })
            .then(res => {
                console.log(res)
                setGames(res.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => getGames, [])

    const names = games.map(item => {
        return item.game.name
    })

    const namesNoRepeat = [...new Set(names)]
    const gameList = namesNoRepeat?.map(item => {
        return (<div key={item} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 200,
                        height: 100,
                    },
                }}
            >
                <Paper elevation={3} >
                    <div style={{ margin: 0 }}>
                        {item}
                    </div>
                </Paper>
            </Box>
        </div>)
    })
    return <div>{gameList}</div>
}