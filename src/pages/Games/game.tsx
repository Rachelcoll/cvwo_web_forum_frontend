import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface Review {
    created_at: string,
    game_id:number,
    game_review: string,
    id: number,
    score:number,
    updated_at: string,
    user_id: number
}

interface User {
    created_at: string,
    email: string
    id:number,
    password_digest: string,
updated_at: string
}

interface Res {
    review: Review,
    user: User
}

export const Game = (props: {user: {[key: string]: string | number | undefined}}) => {
    const {id} = useParams()
    const [reviews, setReviews] = useState<Res[]>([])
    const [avgScore, setAvgScore] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [score, setScore] = useState<number>(0)

    const scoreHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setScore(parseInt(e.target.value))
    }

    const handleReviewChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value)
    }

    const handleClick = (review_id: number) => {
        axios.delete(`http://localhost:3001/games/${id}/reviews/${review_id}`, {withCredentials: true})
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
        }, {withCredentials: true})
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const getGame = () => {
        axios.get(`http://localhost:3001/games/${id}/reviews`, {withCredentials: true})
        .then(res => {
            setReviews(res.data)
        })
        .catch(err => console.log(err))
        axios.get(`http://localhost:3001/games/${id}/avg_score`, {withCredentials: true})
        .then(res => {
            console.log('aaaaaaaaaaaaaaa', res)
            setAvgScore(res.data.avg_score)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getGame, [])

    const reviewList = reviews?.map(item => {
        return (
            <div key={item.review.id}>
            <h3>by: {item.user.email}</h3>
            <h3>time:{item.review.created_at}</h3>
            <h3>score: {item.review.score}</h3>
            <h3>review: {item.review.game_review}</h3>
            {props.user.id === item.review.user_id
            ? <button onClick={() => handleClick(item.review.id)}>Delete</button>
            : null}
        </div>)
    })

    return (<div>
        <h1>{avgScore ? parseFloat(avgScore).toFixed(1): null}</h1>
        <div>
            <form onSubmit={handleSubmit}>
                Send a review:
                <input value={review} type="text" onChange={handleReviewChange} />
                <label>
                    Score the Game
                    <select value={score} onChange={scoreHandler}>
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>
                        <option value={0}>0</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        { reviews.length === 0 
        ? <div>
            <h1>Average: 0</h1>
            <h1>no reviews yet, send a comment first</h1>
            </div>
        : reviewList}
    </div>)
}