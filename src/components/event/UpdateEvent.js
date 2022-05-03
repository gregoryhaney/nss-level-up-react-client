/*
    The purpose of this component is to provide for the
    ability to update an event's data using a form.
*/


/*        TODO:
    When the form renders, existing data pre-fills the form's
    fields, with two exceptions: 
        1. the "DATE"
        2. the "GAME" dropdown
*/

import { getGames } from "../game/GameManager.js"
import React, { useEffect, useState } from "react"
import { getEventToEdit } from "./EventManager.js"
import { useHistory, useParams } from "react-router-dom"

export const UpdateEvent = () => {      
    const history = useHistory()
    const id = useParams()
   
    const [ event, updateEvent ] = useState({})
    const [ eventToEdit, setEventToEdit ] = useState([])
    const [ games, setGames ] = useState([])
    
    
         // get the event to be updated from the DB
        
        useEffect (
            () => {
                getEventToEdit(id)
                   .then(res => res.json())
                    .then((editEventArray) => {
                        setEventToEdit(editEventArray)
                    })
                },
                    [])

     

          // Get the games, then set the state

          useEffect (
            () => {  
                getGames()
                    .then((gamesArray) => {
                        setGames(gamesArray)
                    })
                },
                    [])

 
             // object builder           
        const editEvent = {
            description: event.description,
            date: event.date,
            time: event.time,
            game: event.game
        }

            // FN to handle the PUT action for the newly build event object
            // it is called when user clicks "Save Changes" button 
        
            const makeTheUpdate = () => {
            const fetchOption = {
                method: "PUT",
                headers:  {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                },
                body: JSON.stringify(editEvent)
            }
            return fetch (`http://localhost:8000/events/${id.id}`, fetchOption)
                .then(() => {
                    history.push("/events")
                })
        }
    
        
        return (
            <form className="eventForm">
                <h2 className="eventForm__description">Update the Event Data</h2>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="description" required autoFocus className="form-control" placeholder={eventToEdit.description}
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
                                <input type="date" name="date" required autoFocus className="form-control" placeholder={eventToEdit.date}
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
                                <input type="text" name="time" required autoFocus className="form-control" placeholder={eventToEdit.time}
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
                        {makeTheUpdate()}
                        
                    }}
                    button className="btn btn-4 btn-sep icon-create">Save Changes</button>
            </form>
        )
}
