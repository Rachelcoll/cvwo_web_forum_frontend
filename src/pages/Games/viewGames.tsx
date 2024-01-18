import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, CardTitle } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button as Btn, CardContent } from "@mui/material";
import Rating from '@mui/material/Rating';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface Game {
    id: number;
    name: string;
    release_date: string;
    developers: string;
    genre: string;
    created_at: string;
    updated_at: string;
    avg_score: string
}
export const ViewGames = () => {
    const [games, setGames] = useState<Game[]>([])
    const getGames = () => {
        axios.get('http://localhost:3001/games', { withCredentials: true })
            .then(res => setGames(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => getGames, [])

    const gameRank = games.slice().sort((a, b) => {
        if (a.avg_score === null && b.avg_score === null) {
            return 0;
        }
        if (a.avg_score === null) {
            return 1;
        }
        if (b.avg_score === null) {
            return -1;
        }
        const numberA = parseFloat(a.avg_score);
        const numberB = parseFloat(b.avg_score);

        return numberB - numberA;
    })

    const rankList = gameRank?.map(item => {
        return <div key={item.id}>
            <br/>
            <Card>
            <CardContent>{item.name}</CardContent>   
            <CardContent style={{color: '#e57373'}}>{item.avg_score}</CardContent>
            <CardContent>
                <Rating name="read-only" value={parseInt(item.avg_score)} readOnly />
            </CardContent>
            <Link to={`/game/${item.id}`}><Btn>View</Btn></Link>
            </Card>
        </div>
    })
    const gamesList = games?.map(item => {
        return (<div key={item.id}>
            <Container className="align-items-center justify-content-center" >
                <Row className="mt-4">
                    <Col xs={{ span: 12, offset: 0 }} >
                        <Card>
                            <Card.Header as="h5"></Card.Header>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    <Container>
                                        <Row>
                                            <Col>
                                                {item.release_date}
                                            </Col>
                                            <Col>
                                                {item.genre}
                                            </Col>
                                            <Col>
                                                {item.developers}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Text>
                                <Link to={`/game/${item.id}`}><Button variant="primary">Show detail</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>)
    })
    return (<div>
        <Container>
            <Row className="mt-4">
                <Col xs={4}>
                    <CardTitle>Game Rank (by score)</CardTitle>
                    {rankList}
                </Col>
                <Col xs={6}>
                    {gamesList}
                </Col>
            </Row>
        </Container>
    </div>)
}