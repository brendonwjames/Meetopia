import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { remove } from '../../store/events';
import './DeleteEventPage.css'

const DeleteEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { eventId } = useParams();
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(remove(eventId));
        history.push('/events');
    }

    return (
        <div className='delete-event-modal'>
            <p className='modal-message'>Are you sure you want to delete this event?</p>
            <button className='confirm-delete-button' onClick={onSubmit}>Confirm Delete</button>
        </div>
    )
};

export default DeleteEventPage
