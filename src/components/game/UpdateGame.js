/*
    The purpose of this component is to provide for the
    ability to update a game's data using a form.
*/


/*        TODO:
    When the form renders, existing data pre-fills the form's
    fields, with one exception: the Game Type dropdown.
        The dropdown should show the current value from the DB.ß

*/


import React, { useEffect, useState } from "react"
import { getGameTypes, getGameToEdit } from "./GameManager.js"
import { useHistory, useParams } from "react-router-dom"

export const UpdateGame = () => {      
    const history = useHistory()
    const id = useParams()
   
    const [ game, updateGame ] = useState({})
    const [ gameToEdit, setGameToEdit ] = useState([])
    const [ gameTypes, setGameTypes ] = useState([])
    
    
         // get the game to be updated from the DB
        
        useEffect (
            () => {
                getGameToEdit(id)
                   .then(res => res.json())
                    .then((editGameArray) => {
                        setGameToEdit(editGameArray)
                    })
                },
                    [])

                 // Get the game types, then set the state

        useEffect (
            () => {  
                getGameTypes()
                    .then(res => res.json())
                    .then((gameTypesArray) => {
                        setGameTypes(gameTypesArray)
                    })
                },
                    [])

 
             // object builder           
        const editGame = {
            title: game.title,
            maker: game.maker,
            number_of_players: game.numberOfPlayers,
            skill_level: game.skillLevel,
            game_type: game.gameTypeId
        }

            // FN to handle the PUT action for the newly build game object
            // it is called when user clicks "Save Changes" button
        const makeTheUpdate = () => {
            const fetchOption = {
                method: "PUT",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                },
                body: JSON.stringify(editGame)
            }
            return fetch (`http://localhost:8000/games/${id.id}`, fetchOption)
                .then(() => {
                    history.push("/games")
                })
        }
    

    return (
        <form className="updateGameForm">
            <h2 className="updateGameForm__title">Update the Game Data</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control" placeholder={gameToEdit.title}
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
                            <input type="text" name="maker" required autoFocus className="form-control" placeholder={gameToEdit.maker}
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
                            <input type="number" name="numberOfPlayers" required autoFocus className="form-control" placeholder={gameToEdit.number_of_players}
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
                            <input type="text" name="skillLevel" required autoFocus className="form-control" placeholder={gameToEdit.skill_level}
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
                        {makeTheUpdate()}
                }}
                button className="btn btn-4 btn-sep icon-create">Save Changes</button>
        </form>
    )
}