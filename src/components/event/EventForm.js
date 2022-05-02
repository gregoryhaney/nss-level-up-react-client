/*
    The purpose of this component is to provide a form for
    creating a new event and adding it to the DB.
*/

import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from './EventManager.js'
import { getGames } from '../game/GameManager.js'

export const EventForm = () => {
      
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [event, updateEvent] = useState({
        time: "",
        description: "",
        date: "",
        game_id: 0
    })
    const history = useHistory()
    const [games, setGames] = useState([])
    
    useEffect(() => {
        getGames()
        .then((gamesArray) => {
            setGames(gamesArray)
        })
    }, [])

    const submitEvent = (evt) => {
        const newEvent = {
            description: event.description,
            date: event.date,
            time: event.time,
            game_id: event.game_id
        }
       createEvent(event)
            .then(() => {
                history.push("/events")
            })
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__description">Register New Event</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" required autoFocus className="form-control"
                            value={event.description}
                            onChange={
                                (evt) => {
                                    const copy = {...event}
                                    copy.description = evt.target.value
                                    updateEvent(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>

                <fieldset>
                        <div className="form-group">
                            <label htmlFor="date">Date: </label>
                            <input type="date" name="date" required autoFocus className="form-control"
                                value={event.date}
                                onChange={
                                    (evt) => {
                                        const copy = {...event}
                                        copy.date = evt.target.value
                                        updateEvent(copy)
                                    }
                                }
                            />
                        </div>
                </fieldset>

                <fieldset>
                        <div className="form-group">
                            <label htmlFor="time">Time: </label>
                            <input type="text" name="time" required autoFocus className="form-control"
                                value={event.time}
                                onChange={
                                    (evt) => {
                                        const copy = {...event}
                                        copy.time = evt.target.value
                                        updateEvent(copy)
                                    }
                                }
                            />
                        </div>
                </fieldset>

                
                <fieldset>
                        <div className="form-group">
                            <label htmlFor="gameId">Game: </label>
                            <select defaultValue={'0'}
                                onChange={
                                    (evt) => {
                                        const copy = {...event}
                                        copy.game_id = parseInt(evt.target.value)
                                        updateEvent(copy)
                                    }}>
                                <option value="0">Choose the game ...</option>
                                    {
                                    games.map(game => {
                                        return <option key={`games--${game.id}`} value={game.id}>
                                            {game.title}
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
                        submitEvent(event)
                    
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}