import { csrfFetch } from "./csrf";

const ADD_EVENT = 'events/ADD';

//create event action creator
const addEvent = (event) => ({
    type: ADD_EVENT,
    event
})

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
    switch(action.type) {
        case ADD_EVENT:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
}

export default eventReducer