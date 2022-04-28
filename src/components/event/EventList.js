import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"



// FN to list all all the events
export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__when">will be held on {event.date} at {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}