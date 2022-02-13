import { csrfFetch } from "./csrf";

const GET_EVENTS = 'events/GET';
const ADD_EVENT = 'events/ADD';
const EDIT_EVENT = 'events/EDIT';
const GET_ONE_EVENT = 'events/GET_ONE';
const DELETE_EVENT = 'events/DELETE';
const CREATE_RSVP = 'events/CREATE_RSVP';
const DELETE_RSVP = 'events/DELETE_RSVP';
// const GET_RSVPS = 'events/GET_RSVPS';

// const getRsvps = (rsvps) => ({
//     type: GET_RSVPS,
//     rsvps
// });

// export const loadRsvps = () => async (dispatch) => {
//     const response = await csrfFetch(`/api/events/rsvp`, {
//         method: 'GET'
//     });

//     if (response.ok) {
//         const rsvpList = await response.json();
//         dispatch(getRsvps(rsvpList));
//         console.log(rsvpList)
//         return rsvpList
//     }
// }

const deleteRsvp = (eventRsvp) => ({
    type: DELETE_RSVP,
    eventRsvp
});

export const removeRsvp = (rsvp) => async (dispatch) => {
    const { rsvpEvent, rsvpUser } = rsvp;
    const response = await csrfFetch(`/api/events/rsvp`, {
        method: 'DELETE',
        body: JSON.stringify({ rsvpEvent, rsvpUser })
    })

    if (response.ok) {
        dispatch(getEventDetails(rsvpEvent))
    }
}

const createRsvp = (eventRsvp) => ({
    type: CREATE_RSVP,
    eventRsvp
});

export const addRsvp = (rsvp) => async (dispatch) => {
    const { eventId, userId } = rsvp;
    const response = await csrfFetch('/api/events/rsvp', {
        method: 'POST',
        body: JSON.stringify({ eventId, userId })
    })

    if (response.ok) {
        rsvp = await response.json()
        dispatch(createRsvp(rsvp))
        return
    }
}

//delete event action creator
const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
});

//delete event action thunk
export const remove = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteEvent(eventId))
    }
}

//read event action creator
const loadEvents = (events) => ({
    type: GET_EVENTS,
    events
})

//read event action thunk
export const getEvents = () => async (dispatch) => {
    const response = await csrfFetch(`/api/events`);

    if (response.ok) {
        const eventList = await response.json();
        dispatch(loadEvents(eventList));
        return eventList
    }
}

//read one event action creator
const oneEvent = (event) => {
    return {
        type: GET_ONE_EVENT,
        event
    };
};

//read one event action thunk
export const getEventDetails = (eventId) => async (dispatch) => {
    //assign the fetch call to result
    const result = await csrfFetch(`/api/events/${eventId}`);

    //dispatch action creator result.json if successful
    if (result.ok) {
        const event = await result.json();
        dispatch(oneEvent(event));
        return result;
    }
};


//edit event action creator
const edit = (event) => ({
    type: EDIT_EVENT,
    event
})

//edit event action thunk
export const editEvent = (event) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event)
    })
    if (response.ok) {
        const editedEvent = await response.json()
        dispatch(edit(editedEvent))
        // console.log(response)
        return editedEvent
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
    });
    // console.log(response, '***********')
    //if response is ok, dispatch newEvent using action creator
    if (response.ok) {
        event = await response.json()
        dispatch(addEvent(event))
        return
    }
    //return the newEvent
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
            newState = { ...state, [action.event.id]: action.event }
            return newState;
        // case GET_RSVPS:
        //     newState = {}
        //     Object.entries(action.rsvps)
        //     return newState
        case CREATE_RSVP:
            // newState = { ...state, rsvps: { [action.eventRsvp.id]: action.eventRsvp }}
            newState = {
                ...state,
                [action.eventRsvp.eventId]: {
                    ...state[action.eventRsvp.eventId],
                    Rsvps: [
                    ...state[action.eventRsvp.eventId].Rsvps,
                    action.eventRsvp,
                ]}
            };
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
            return newState
        case DELETE_EVENT:
            newState = { ...state }
            delete newState[action.eventId];
            return newState;
        case DELETE_RSVP:
            newState = { ...state }
            delete newState[action.eventRsvp]
            return newState;
        default:
            return state;
    }
}

export default eventReducer