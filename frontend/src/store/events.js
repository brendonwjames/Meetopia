import { csrfFetch } from "./csrf";

const GET_EVENTS = 'events/GET';
const ADD_EVENT = 'events/ADD';
const EDIT_EVENT = 'events/EDIT';
const GET_ONE_EVENT = 'events/GET_ONE'

const oneEvent = (event) => {
    return {
        type: GET_ONE_EVENT,
        event
    };
};

export const getEventDetails = (eventId) => async (dispatch) => {
    const result = await csrfFetch(`/api/events/${eventId}`);
  
    if (result.ok) {
      const event = await result.json();
      dispatch(oneEvent(event));
    }
  
    return result;
  };


// const edit = (event) => ({
//     type: EDIT_EVENT,
//     event
// })

// export const editEvent = (event) => async (dispatch) => {
//     const response = await csrfFetch(`/api/events/${event.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(event)
//     })
//     if (response.ok) {
//         const editedEvent = await response.json()
//         dispatch(edit(editedEvent))
//         console.log(response)
//         return editedEvent
//     }
// }

const loadEvents = (events) => ({
    type: GET_EVENTS,
    events
})

//read event action creator
export const getEvents = () => async (dispatch) => {
    const response = await csrfFetch(`/api/events`);

    // console.log(eventList, "lllllllllllll")
    if (response.ok) {
        const eventList = await response.json();
        dispatch(loadEvents(eventList));
        return eventList
    }
}

//create event action creator
const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});


//create event thunk action
export const createEvent = (event) => async (dispatch) => {
    //set new object equal to event with the variables needed for user input
    const { hostId, categoryId, eventName, date, capacity } = event;
    //set response equal to event parameters
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ hostId, categoryId, eventName, date, capacity })
    })
    let newEvent;
    //if response is ok, dispatch newEvent using action creator
    if (response.ok) {
        newEvent = await response.json()
        dispatch(addEvent(newEvent))
    }
    //return the newEvent
    return newEvent;
}

const eventReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTS:
            newState = {}
            action.events.forEach(event => newState[event.id] = event)
                return newState
        case ADD_EVENT:
            // newState = Object.assign({}, state);
            newState = {...state};
            newState.user = action.user;
            return newState;
        case EDIT_EVENT:
            return {
                ...state,
                [action.event.id]: action.event
            }
        case GET_ONE_EVENT:
            newState = {
                ...state,
                [action.event.id]: {
                ...state[action.event.id],
                ...action.event
                }
            };
        default:
            return state; 
    }
}

export default eventReducer