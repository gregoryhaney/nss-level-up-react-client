
export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const getGameToEdit = (id) => {
    return fetch(`http://localhost:8000/games/${id.id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        // .then(res => res.json())
        
}


// export const getSingleGame = (gameId) => {
//     return fetch(`http://localhost:8000/games/${game.id}`, {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("lu_token")}`
//         }
//     })
//         .then(response => response.json())
// }


/*
 ABOVE: the Authorization in the Header retrieves the value of the
 currently-logged-in-user's token. It will be in every fetch call to 
 the DB to let the server know which user is logged in
 */

 // FN to create a new game
 export const createGame = (game) => {
     return fetch("http://localhost:8000/games", { 
    method: "POST",   
    headers:{
            "content-type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    body: JSON.stringify(game)
    })
         .then(response => response.json())
}

// FN to fetch the Game Types
export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then()
}

// FN to update a game
export const updateGame = (updatedGame) => {
    return fetch("http://localhost:8000/games", { 
   method: "PUT",   
   headers:{
           "content-type": "application/json",
           "Authorization": `Token ${localStorage.getItem("lu_token")}`
       },
   body: JSON.stringify(updatedGame)
   })
        .then(response => response.json())
}