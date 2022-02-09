import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editEvent } from '../../store/events'
import { Link, useHistory, useParams } from 'react-router-dom';


const EditEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();
    console.log(eventId)







    return (
        <div className='event-form-container'>
            <form
                className='event-form'
            >
                <div>Edit</div>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                    />
                </label>
                <label>
                    Date
                    <input
                        type='date'
                        name='date'
                    />
                </label>
                <label>
                    Capacity
                    <input
                        type="number"
                        name="capacity"
                    />
                </label>
                <div className='event-form-buttons-section'>
                    <button
                        type="submit"
                    >
                        Save Changes
                    </button>
                    <Link to='/events' className='cancel-event-button'>Cancel</Link>
                </div>
            </form>
        </div>
    )
}


export default EditEventPage