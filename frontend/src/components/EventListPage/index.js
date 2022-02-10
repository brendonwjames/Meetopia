import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';

const EventListPage = () => {
    const dispatch = useDispatch();

    const eventsObj = useSelector(state => state.events)

    const events = Object.values(eventsObj);
    console.log(events, "12345");

    useEffect(() => {
        dispatch(getEvents());
    }, [])

    return(
        <>
            <NavLink to='/events/new'>Add Event</NavLink>
            {events?.map((event) => (
                <div className='event-container'  key={`${event?.id}`}>
                    <NavLink exact to={`/events/${event?.id}`}>{event?.eventName}</NavLink>
                    <p>Capacity = {`${event?.capacity}`}</p>
                </div>
            ))}
        </>
    )
}


export default EventListPage