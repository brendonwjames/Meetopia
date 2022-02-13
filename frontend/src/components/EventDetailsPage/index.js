import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addRsvp, getEventDetails, removeRsvp } from '../../store/events';
import EditEventModal from '../EditEventModal';
import DeleteEventModal from '../DeleteEventModal';
// import { Redirect } from 'react-router-dom';
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
    // console.log(eventId);
    const event = useSelector(state => state?.events[eventId])
    // console.log(!event, "0987654321")

    const sessionUser = useSelector(state => state.session?.user)
    // console.log(sessionUser.id, "*******", event.hostId)   
    // const rsvpsObj = useSelector(state => state.events?.rsvps)
    // console.log(rsvpsObj, "******")
    const rsvpArray = useSelector(state => state.events[eventId].Rsvps)
    console.log(rsvpArray, 'THIS IS THE ARRAY');
    // console.log(rsvpArray.includes({})
    // for (let i in rsvpArray) {
    //     console.log(`${i}: ${rsvpArray[i]}`, "555555555")
    // }

    // if (rsvpArray.includes({eventId: eventId}))

    const rsvpUser = rsvpArray[0].userId;
    const rsvpEvent = rsvpArray[0].eventId;
    // if (rsvpsObj) {
    //     rsvpKey = Object.keys(rsvpArray);
    // }
    // console.log(rsvpKey, "0000000000")
    // console.log(rsvpsObj.eventId)

    // if (rsvpsObj)
    //     console.log(rsvpsObj, "************")

    // console.log(event.Rsvps)
    if (!event) {
        console.log('a;lsdjf;kasdlfj;kj')
        history.push('/events')
    }

    let editButtons;
    if (sessionUser && sessionUser.id === event.hostId) {
        editButtons = (
            <div className='edit-delete-buttons'>
                <EditEventModal className />
                <DeleteEventModal />
            </div>
        )
    }
    else if (sessionUser && sessionUser.id !== event.hostId) {
        editButtons = <div></div>
    }

    useEffect(() => {
        dispatch(getEventDetails(eventId))
    }, [dispatch, eventId])

    // let attendance;
    // if (event.Rsvps) {
    //     attendance = event.Rsvps.length;
    // } else {
    //     attendance = 0
    // }

    return (
        <>
            <h1 className='event-name'>{`${event.eventName}`}</h1>
            <p className='date'>{`${formatDate(event.date)}`}</p>
            <p className='capacity'>Event Capacity: {`${event.capacity}`}</p>
            {/* <div className='rsvp-count'>Number of Attendees: {`${attendance}`}</div> */}
            <button className='rsvp-button'
                onClick={() => dispatch(addRsvp({ userId: sessionUser.id, eventId }))}
            >
                I would like to attend this event!
            </button>
            <button className='delete-rsvp-button'
                onClick={() => dispatch(removeRsvp({ rsvpEvent, rsvpUser }))}
            >
                Delete Rsvp
            </button>
            <div className='edit-buttons'>{editButtons}</div>
        </>
    )
}

export default EventDetailsPage