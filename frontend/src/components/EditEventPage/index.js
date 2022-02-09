import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editEvent } from '../../store/events'
import { Link, useHistory, useParams } from 'react-router-dom';


const EditEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { eventId } = useParams();
    console.log(eventId, '11')

    eventId = parseInt(eventId);
    console.log(eventId, '22')

    const eventsObj = useSelector(state => state.events)
    console.log(eventsObj, '*****')
    // const event = eventsObj.find(event => event.id === eventId)

    const hostId = useSelector(state => state.session.user.id);

    // const [eventName, setEventName] = useState(event?.eventName);
    // const [date, setDate] = useState(event?.date);
    // const [capacity, setCapacity] = useState(event?.capacity);

    // useEffect(()=> {
    //     setEventName(event?.eventName)
    //     setDate(event?.date)
    //     setCapacity(event?.capacity)
    // }, [event])

    // const reset = () => {
    //     setEventName("");
    //     setDate(new Date());
    //     setCapacity(0);
    // }

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