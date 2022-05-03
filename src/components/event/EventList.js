import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom"


// FN to list all all the events
export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    const deleteEvent = (id) => {
        fetch(`http://localhost:8000/events/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
                .then(getEvents())
    }


    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
           
                <article className="newEventButton">
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/events/new" })
                        }}
                    >Register New Event</button>
                </article>
               
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__when">will be held on {event.date} at {event.time}</div>
                                <article className="editEventButton">
                                <button className="btn btn-4 btn-sep icon-create"
                                onClick={() => {
                                   history.push(`events/update/${event.id}`)
                                }}
                                    >Edit This Event</button>
                                </article>

                                <article className="deleteEventButton">
                                <button className="btn btn-3 btn-sep icon-create"
                                onClick={() => {
                                   deleteEvent(event.id)
                                }}
                                    >Delete This Event</button>
                                </article>
                    </section>
                })
            }
        </article>
    )
}
