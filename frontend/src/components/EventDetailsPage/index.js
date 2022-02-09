import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails } from '../../store/events';
import EditEventModal from '../EditEventModal';



const EventDetailsPage = () => {
    const { eventId } = useParams()
    // console.log(eventId);
    const event = useSelector(state => state.events[eventId])
    // console.log(event)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEventDetails(eventId))
    }, [dispatch, eventId])


    return(
        <>
            <h1>{`${event.eventName}`}</h1>
            <p>Capacity = {`${event.capacity}`}</p>
            <EditEventModal />
        </>
    )
}

export default EventDetailsPage