import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom"
import { joinEvent, leaveEvent } from "./EventManager.js"

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
                                    {
                                        event.joined ?
                                <article className="leaveEventButton">
                                <button className="btn btn-1 btn-sep icon-create"
                                onClick={() => {
                                   leaveEvent(event.id)
                                }}
                                    >Leave This Event</button>
                                </article>                                
                                :
                                <article className="joinEventButton">       
                                <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                   joinEvent(event.id)
                                }}
                                    >Join This Event</button>
                                </article>
                                }
                    </section>
                })
            }
        </article>
    )
}


    /*
        ABOVE, within the events.map, the .joined property is used to encapsulate
        the LEAVE and JOIN buttons. The .joined code block works like this:
            {
                event.joined ?
                    BUILD LEAVE BUTTON HERE
                :
                    BUILD JOIN BUTTON HERE
            }
        It operates as: 'if true, do this' ELSE 'do this'. In this case, if
        the user is joined to the event, the LEAVE button will be visible,
        otherwise, the user has NOT joined the event, so the JOIN button will
        be visible. The button will flip between JOIN and LEAVE, depending on
        the user's status for the event.
    */


