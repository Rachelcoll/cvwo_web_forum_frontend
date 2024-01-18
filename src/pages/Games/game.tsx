import { CardContent } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Row, Col, Form, Button as Btn } from "react-bootstrap";
import { Link } from "react-router-dom";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);



interface Review {
    created_at: string,
    game_id: number,
    game_review: string,
    id: number,
    score: number,
    updated_at: string,
    user_id: number
}

interface User {
    created_at: string,
    email: string
    id: number,
    password_digest: string,
    updated_at: string
}

interface Res {
    review: Review,
    user: User
}
interface Game {
    id: number;
    name: string;
    release_date: string;
    developers: string;
    genre: string;
    created_at: string;
    updated_at: string;
}

export const Game = (props: { user: { [key: string]: string | number | undefined } }) => {
    const { id } = useParams()
    const [reviews, setReviews] = useState<Res[]>([])
    const [avgScore, setAvgScore] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [score, setScore] = useState<number>(0)
    const [game, setGame] = useState<Game>()

    const scoreHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setScore(parseInt(e.target.value))
    }

    const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value)
    }

    const handleClick = (review_id: number) => {
        axios.delete(`http://localhost:3001/games/${id}/reviews/${review_id}`, { withCredentials: true })
            .then(res => window.location.reload())
            .catch(err => console.log(err))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event?.preventDefault()
        axios.post(`http://localhost:3001/games/${id}/reviews`, {
            review: {
                game_review: review,
                score: score
            }
        }, { withCredentials: true })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const getGame = () => {
        axios.get(`http://localhost:3001/games/${id}/current_game`, { withCredentials: true })
            .then(res => {
                setGame(res.data)
            })
            .catch(err => console.log(err))
        axios.get(`http://localhost:3001/games/${id}/reviews`, { withCredentials: true })
            .then(res => {
                setReviews(res.data)
            })
            .catch(err => console.log(err))
        axios.get(`http://localhost:3001/games/${id}/avg_score`, { withCredentials: true })
            .then(res => {
                setAvgScore(res.data.avg_score)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => getGame, [])

    const reviewList = reviews?.map(item => {
        return (
            <div key={item.review.id}>
                <React.Fragment>
                    <Container className="align-items-center justify-content-center">
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {item.review.game_review}
                            </Typography>
                            <Typography variant="body1">
                            Score given: {item.review.score}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                time: {item.review.created_at.slice(0, 16)}
                                <br/>
                                By: {item.user.email}
                            </Typography>
                            {props.user.id === item.review.user_id
                                ? <Button onClick={() => handleClick(item.review.id)}>Delete</Button>
                                : null}
                        </CardContent>
                    </Container>
                </React.Fragment>
            </div>)
    })

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    The score of game is: {avgScore ? parseFloat(avgScore).toFixed(1) : null}
                </Typography>
                <Typography variant="h5" component="div">
                    {game?.name}
                </Typography>
                <br />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {game?.genre}
                </Typography>
                <Typography variant="body2">
                    {game?.developers}  {game?.release_date}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const OutlinedCard = () => {
        return (
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        );
    }

    return (<div>
        <OutlinedCard />
        <div>
            <Container className="mt-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
                        <Form.Label column sm={2}>New Review</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Your review" value={review} onChange={handleReviewChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Game Score</Form.Label>
                        <Col sm={10} >
                            <Form.Select aria-label="Select tag" value={score} onChange={scoreHandler}>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                                <option value={0}>0</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Row className="mt-4">
                            <Col>
                            <Btn variant="outline-dark" type="submit">Post</Btn>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Link to="/games"><Btn variant="outline-dark">Back</Btn></Link>
                        </Row>
                    </Row>
                </Form>
            </Container>
        </div>
        {reviews.length === 0
            ? <div>
                <CardContent>no reviews yet, send a comment first</CardContent>
            </div>
            : reviewList}
    </div>)
}