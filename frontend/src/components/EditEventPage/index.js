import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import { editEvent } from '../../store/events';
import './EditEventPage.css';

const EditEventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { eventId } = useParams();

    eventId = parseInt(eventId);
    // console.log(eventId)

    const eventsObj = useSelector(state => Object.values(state.events))
    // console.log(eventsObj, '*****', eventId)
    const event = eventsObj.find(event => event.id === eventId);
    // console.log(event)

    const hostId = useSelector(state => state.session.user.id);
    // console.log(hostId)

    const [eventName, setEventName] = useState(event?.eventName);
    const [date, setDate] = useState(event?.date);
    const [capacity, setCapacity] = useState(event?.capacity);
    const [categoryId, setCategoryId] = useState(event?.categoryId);
    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        setEventName(event?.eventName);
        setDate(event?.date);
        setCapacity(event?.capacity);
        setCategoryId(event?.categoryId);
    }, [event, dispatch])

    // const reset = () => {
    //     setEventName("");
    //     setDate(new Date());
    //     setCapacity(20);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = { id: event.id, hostId, categoryId, eventName, date, capacity };
        // let updateEvent = dispatch(editEvent(payload));

        // if (updateEvent) {
        //     history.push('/events');
        //     reset();
        // }

        return dispatch(editEvent(payload))
            .then(() => history.push(`/events/`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    let errorMsg;
    if (errors.length > 0) {
      errorMsg = (
        <div className='event-form-errors'>
          <p>The following error(s) occurred:</p>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div>
      );
    } else {
      errorMsg = null;
    }

    return (
        <div className='edit-event-modal'>
            <form
                className='event-form'
                onSubmit={handleSubmit}
            >
                {errorMsg}
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date
                    <input
                        type='date'
                        name='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Capacity
                    <input
                        type="number"
                        name="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </label>
                <div className='event-form-buttons'>
                    <button
                        type="submit"
                        className='confirm-changes-button'
                    >
                        Confirm Changes
                    </button>
                    <Link to='/events/' className='cancel-event-button'>Cancel</Link>
                </div>
            </form>
        </div>
    )
}


export default EditEventPage