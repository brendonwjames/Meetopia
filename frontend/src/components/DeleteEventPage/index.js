import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import { remove } from '../../store/events';

const DeleteEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { eventId } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();

        const deletedEvent = await dispatch(remove(eventId))

        if (deletedEvent) {
            history.push('/events')
        }
    }

    return (
        <button onClick={onSubmit}>Confirm Delete</button>
    )
};

export default DeleteEventPage
