import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { EventList } from "./event/EventList.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./event/EventForm.js"
import { UpdateGame } from "./game/UpdateGame.js"
import { UpdateEvent } from "./event/UpdateEvent"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>

            <Route exact path="/events">
                <EventList />
            </Route>

            <Route exact path="/events/new">
                <EventForm />
            </Route>

            <Route exact path="/events/update/:id(\d+)">
                <UpdateEvent />
            </Route>

            <Route exact path="/games">
                <GameList />
            </Route>

            <Route exact path="/games/new">
                <GameForm />
            </Route>

            <Route exact path="/games/update/:id(\d+)">
                <UpdateGame />
            </Route>

        </main>
    </>
}
