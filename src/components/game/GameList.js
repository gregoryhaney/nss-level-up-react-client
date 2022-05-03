import React, { useEffect, useState } from "react"
import { getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom"
import { UpdateGame } from "./UpdateGame.js"


// FN to list all all the games
export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            
                <article className="newGameButton">
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/games/new" })
                        }}
                    >Register New Game</button>
                </article>
            {    
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                                <article className="editGameButton">
                                <button className="btn btn-3 btn-sep icon-create"
                                onClick={() => {
                                   history.push(`games/update/${game.id}`)
                                }}
                                    >Edit This Game</button>
                                </article>

                    </section>
                })
            }
        </article>
    )
}