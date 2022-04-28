export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
/*
 The Authorization in the Header is used to retrieve the value of the
 currently-logged-in-user's token. It will be in every fetch call to 
 the DB to let the server know which user is logged in
 */
