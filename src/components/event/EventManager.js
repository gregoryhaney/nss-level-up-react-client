export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
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


 // FN to create a new event
 export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", { 
   method: "POST",   
   headers:{
           "content-type": "application/json",
           "Authorization": `Token ${localStorage.getItem("lu_token")}`
       },
   body: JSON.stringify(event)
   })
        .then(response => response.json())
}