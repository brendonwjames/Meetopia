import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';
import './EventListPage.css';

const EventListPage = () => {
    const dispatch = useDispatch();

    const eventsObj = useSelector(state => state.events)

    const events = Object.values(eventsObj);

    useEffect(() => {
        dispatch(getEvents());
    }, [])

    return(
        <div className='event-list-container'>
            <NavLink className='add-event-button' to='/events/new'>Add Event</NavLink>
            <div className='event-container'>
                {events?.map((event) => (
                    <div className='event-container'  key={`${event?.id}`}>
                        <NavLink exact to={`/events/${event?.id}`}>{event?.eventName}</NavLink>
                        <p>Capacity = {`${event?.capacity}`}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default EventListPage