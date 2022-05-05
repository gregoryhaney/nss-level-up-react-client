

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


export const getEventToEdit = (id) => {
    return fetch(`http://localhost:8000/events/${id.id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })        
}


export const updateEvent = () => {
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


export const leaveEvent = id => {
    fetch(`http://localhost:8000/events/${id}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
                .then(getEvents())
}

export const joinEvent = id => {
    fetch(`http://localhost:8000/events/${id}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}` 
        }
    })
                .then(getEvents())
}
