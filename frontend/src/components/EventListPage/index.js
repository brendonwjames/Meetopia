import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, getEventDetails } from '../../store/events';
import { NavLink } from 'react-router-dom';
import './EventListPage.css';

const EventListPage = () => {
    const dispatch = useDispatch();

    const eventsObj = useSelector(state => state.events)

    const events = Object.values(eventsObj);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch])

    return(
        <div className='event-list-container'>
            <NavLink className='add-event-button' to='/events/new'>Create New Event</NavLink>
            <div className='event-container'>
                {events?.map((event) => (
                    <div className='event-container'  key={`${event?.id}`}>
                        <NavLink className='event-link' exact to={`/events/${event?.id}`}>{event?.eventName}</NavLink>
                        <p className='event-capacity'>Event Capacity: {`${event?.capacity}`}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default EventListPage