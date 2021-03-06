import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addRsvp, getEventDetails, removeRsvp, getEvents } from '../../store/events';
import EditEventModal from '../EditEventModal';
import DeleteEventModal from '../DeleteEventModal';
import './EventDetailsPage.css';


const formatDate = (date) => {
    const dateString = new Date(date).toDateString();
    const dateStringSplit = dateString.split(' ');
    const formattedDate = `${dateStringSplit[0]}, ${dateStringSplit[1]} ${dateStringSplit[2]}, ${dateStringSplit[3]}`;
    return formattedDate;
}

const EventDetailsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();


    const { eventId } = useParams()
    const event = useSelector(state => state?.events[eventId])

    const sessionUser = useSelector(state => state.session?.user)
    const rsvpArray = useSelector(state => state.events[eventId]?.Rsvps)
    // console.log(rsvpArray, 'THIS IS THE ARRAY');

    const rsvpExists = rsvpArray?.find(({ userId }) => sessionUser.id === userId);

    let attendanceButtons;
    if (rsvpExists) {
        const { userId: rsvpUser, eventId: rsvpEvent } = rsvpExists;
        attendanceButtons = (
            <button 
                className='delete-rsvp-button'
                onClick={() => dispatch(removeRsvp({ rsvpEvent, rsvpUser }))}
             >
                I no longer want to attend this event
            </button>
        )
    } else {
        attendanceButtons = (
            <button 
                className='rsvp-button'
                onClick={() => dispatch(addRsvp({ userId: sessionUser.id, eventId }))}
            >
                I would like to attend this event!
            </button>
        )
    }

    if (!event) {
        console.log('redirecting')
        history.push('/events')
    }

    let editButtons;
    if (sessionUser && event.hostId && sessionUser.id === event.hostId) {
        editButtons = (
            <div className='edit-delete-buttons'>
                <EditEventModal />
                <DeleteEventModal />
            </div>
        )
        attendanceButtons = <div className='host-attendnace-message'>You are the host. Of course you are attending!</div>
    }
    else if (sessionUser && sessionUser.id !== event.hostId) {
        editButtons = <div></div>
    }

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getEventDetails(eventId))
    }, [dispatch, eventId])

    let attendance;
    if (rsvpArray) {
        attendance = rsvpArray.length;
    }

    return (
        <div className='event-details-page-container'>
            <div className='event-details-container'>
                <div className='event-name-container'>
                    <h1 className='event-name'>{`${event.eventName}`}</h1>
                </div>
                <p className='date'>{`${formatDate(event.date)}`}</p>
                <p className='capacity'>Event Capacity: {`${event.capacity}`}</p>
                <span>{attendanceButtons}</span>
                <div className='rsvp-count'>Number of Attendees: {`${attendance}`}</div>
                <div className='edit-buttons'>{editButtons}</div>
            </div>
        </div>
    )
}

export default EventDetailsPage