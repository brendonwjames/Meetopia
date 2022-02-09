import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';

const EventListPage = () => {
    const dispatch = useDispatch();

    const eventsObj = useSelector(state => state.events)

    const events = Object.values(eventsObj);
    // console.log(events);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch])

    return(
        <>
            <div>Seeing this</div>
            {events.map((event) => (
                <div key={`${event.id}`}>{event.eventName}</div>
            ))}
        </>
        
    )
}


export default EventListPage