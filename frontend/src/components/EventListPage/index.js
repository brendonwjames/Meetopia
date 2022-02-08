import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../store/events';
import { NavLink } from 'react-router-dom';

const EventListPage = () => {
    const dispatch = useDispatch();

    const eventsObj = useSelector(state => state.events.events)
    let eventsArr =[];

    if (eventsObj) {
        let events = Object.values(eventsObj);
        events.map(event => (
            eventsArr.push(event)
        ))
    }

    
    // const events = Object.values(eventsObj);
    // console.log(events);
    // console.log(eventsObj, "opopopopopo")

    useEffect(() => {
        dispatch(getEvents());
    }, [])

    return(
        <>
            <div>Seeing this</div>
            {eventsArr.map((event) => (
                <div key={`${event.id}`}>{event.eventName}</div>
            ))}
        </>
        
    )
}


export default EventListPage