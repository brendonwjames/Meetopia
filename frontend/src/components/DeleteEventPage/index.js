import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import { remove } from '../../store/events';

const DeleteEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { eventId } = useParams();
    console.log(eventId, "1919191919")
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(remove(eventId));
        history.push('/events');
    }

    return (
        <button onClick={onSubmit}>Confirm Delete</button>
    )
};

export default DeleteEventPage
