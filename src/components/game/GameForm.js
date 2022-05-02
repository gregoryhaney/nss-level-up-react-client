/*
    The purpose of this component is to provide a form for
    creating a new game and adding it to the DB.
*/

import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
      
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [game, updateGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    
    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
        .then(res => res.json())
        .then((gameTypesArray) => {
            setGameTypes(gameTypesArray)
        })
    }, [])

    const submitGame = (evt) => {
        // TODO: Complete the onChange function
        const newGame = {
            title: game.title,
            maker: game.maker,
            number_of_players: game.numberOfPlayers,
            skill_level: game.skillLevel,
            game_type_id: game.gameTypeId
        }
       createGame(newGame)
            .then(() => {
                history.push("/games")
            })
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control"
                            value={game.title}
                            onChange={
                                (evt) => {
                                    const copy = {...game}
                                    copy.title = evt.target.value
                                    updateGame(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>

                <fieldset>
                        <div className="form-group">
                            <label htmlFor="maker">Maker: </label>
                            <input type="text" name="maker" required autoFocus className="form-control"
                                value={game.maker}
                                onChange={
                                    (evt) => {
                                        const copy = {...game}
                                        copy.maker = evt.target.value
                                        updateGame(copy)
                                    }
                                }
                            />
                        </div>
                </fieldset>

                <fieldset>
                        <div className="form-group">
                            <label htmlFor="numberOfPlayers">Number of Players: </label>
                            <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                                value={game.number_of_players}
                                onChange={
                                    (evt) => {
                                        const copy = {...game}
                                        copy.numberOfPlayers = evt.target.value
                                        updateGame(copy)
                                    }
                                }
                            />
                        </div>
                </fieldset>

                <fieldset>
                        <div className="form-group">
                            <label htmlFor="skillLevel">Skill Level: </label>
                            <input type="text" name="skillLevel" required autoFocus className="form-control"
                                value={game.skill_level}
                                onChange={
                                    (evt) => {
                                        const copy = {...game}
                                        copy.skillLevel = evt.target.value
                                        updateGame(copy)
                                    }
                                }
                            />
                        </div>
                </fieldset>

                <fieldset>
                        <div className="form-group">
                            <label htmlFor="gameTypeId">Game Type: </label>
                            <select defaultValue={'0'}
                                onChange={
                                    (domEvent) => {
                                        const copy = {...game}
                                        copy.gameTypeId = parseInt(domEvent.target.value)
                                        updateGame(copy)
                                    }}>
                                <option value="0">Choose the game type...</option>
                                    {
                                    gameTypes.map(type => {
                                        return <option key={`types--${type.id}`} value={type.id}>
                                            {type.label}
                                            </option>                           
                                    }
                                    )}
                            </select>
                        </div>
                </fieldset>



            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                        submitGame(game)
                    //    .then(() => history.push("/games"))
                    // const game = {
                    //     maker: currentGame.maker,
                    //     title: currentGame.title,
                    //     numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    //     skillLevel: parseInt(currentGame.skillLevel),
                    //     gameTypeId: parseInt(currentGame.gameTypeId)
                    // }

                    // // Send POST request to your API
                    // createGame(game)
                    //     .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}