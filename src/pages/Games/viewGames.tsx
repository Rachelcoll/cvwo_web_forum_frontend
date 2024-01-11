import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
interface Game {
    id: number;
    name: string;
    release_date: string;
    developers: string;
    genre: string;
    created_at: string;
    updated_at: string;
  }
export const ViewGames = () => {
    const [games, setGames] = useState<Game[]>([])
    const getGames = () => {
        axios.get('http://localhost:3001/games', {withCredentials: true})
        .then(res => setGames(res.data))
        .catch(err => console.log(err))
    }
    useEffect(() => getGames, [])

    const gamesList = games?.map(item => {
        return (<div key={item.id}>
            <h3>{item.name}</h3>
            <h3>{item.developers}</h3>
            <h3>{item.release_date}</h3>
            <h3>{item.genre}</h3>
            <Link to={`/game/${item.id}`}>Show Detail</Link>
        </div>)
    }) 
    return (<div>
        Check the games!
        {gamesList}
    </div>)
}