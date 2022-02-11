import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails } from '../../store/events';
import EditEventModal from '../EditEventModal';
import DeleteEventModal from '../DeleteEventModal';
import './EventDetailsPage.css'

const formatDate = (date) => {
    const dateString = new Date(date).toDateString();
    const dateStringSplit = dateString.split(' ');
    const formattedDate = `${dateStringSplit[0]}, ${dateStringSplit[1]} ${dateStringSplit[2]}, ${dateStringSplit[3]}`;
    return formattedDate;
}

const EventDetailsPage = () => {
    const { eventId } = useParams()
    // console.log(eventId);
    const event = useSelector(state => state.events[eventId])
    const sessionUser = useSelector(state => state.session.user)
    // console.log(sessionUser.id, "*******", event.hostId)
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getEventDetails(eventId))
    }, [dispatch, eventId])
    
    // console.log(event.Rsvps)
    let editButtons;
    if (sessionUser && sessionUser.id === event.hostId) {
        editButtons = (
            <div className='edit-delete-buttons'>
                <EditEventModal className/>
                <DeleteEventModal />
            </div>
        )}
         else if (sessionUser && sessionUser.id !== event.hostId) {
            editButtons = <div></div>
        }
    
    let attendance;
    if (event.Rsvps) {
        attendance = event.Rsvps.length;
    } else {
        attendance = 0
    }

    return(
        <>
            <h1 className='event-name'>{`${event.eventName}`}</h1>
            <p className='date'>{`${formatDate(event.date)}`}</p>
            <p className='capacity'>Event Capacity: {`${event.capacity}`}</p>
            {/* <div className='rsvp-count'>Number of Attendees: {`${attendance}`}</div> */}
            <button className='attendnace-button'>I would like to attend this event!</button>
            <div className='edit-buttons'>{editButtons}</div>
        </>
    )
}

export default EventDetailsPage