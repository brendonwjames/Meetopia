import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/events';
import { Link, useHistory } from "react-router-dom";
import * as SessionActions from '../../store/session';

const CreateEventForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const hostId = useSelector(state => state.session.user.id)
    const [categoryId, setCategoryId] = useState(0);
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState(new Date());
    const [capacity, setCapacity] = useState(0);

    const reset = () => {
        setCategoryId(0);
        setEventName("");
        setDate(new Date());
        setCapacity(0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = { hostId, categoryId, eventName, date, capacity }
        // console.log(event)
        let newEvent = await dispatch(createEvent(event))

        if (newEvent) {
            history.push('/events/');
            reset();
        }
    }

    return (
        <div className='event-form-container'>
            <form
                className='event-form'
                onSubmit={handleSubmit}
            >
                <h2>Add a new Event</h2>
                <label>
                    Event Name
                    <input
                        type='text'
                        name='name'
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                    />
                </label>
                <label>
                    Date
                    <input
                        type='date'
                        name='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </label>
                <label>
                    Capacity
                    <input
                        type='capacity'
                        name='capacity'
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                    />
                </label>
                <button type='submit'>Submit</button>
                <Link to='/' className='cancel-event-button'>Cancel</Link>
            </form>
        </div>
    )
}

export default CreateEventForm