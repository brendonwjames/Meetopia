import { csrfFetch } from './csrf';

//POPJO action creators (the variables used in the reducer)
const ADD_USER = 'session/addUser';
const REMOVE_USER = 'session/removeUser';


//the actual action creators
const addUser = (user) => {
    return {
        type: ADD_USER,
        user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};


//login thunk
//call the API to login, set session user from the response
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await response.json();
    dispatch(addUser(data.user));
    return response;
}


//signup thunk
export const signup = (user => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
           username,
           email,
           password 
        }),
    });
    const data = await response.json();
    dispatch(addUser(data.user));
    return response;
});

//restore user thunk action
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(addUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;