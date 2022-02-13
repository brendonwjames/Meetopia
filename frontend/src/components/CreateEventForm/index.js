import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/events';
import { NavLink, useHistory } from "react-router-dom";
import { getEvents } from '../../store/events';
import './CreateEventForm.css';

const CreateEventForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    

    const hostId = useSelector(state => state.session.user.id)
    const [categoryId, setCategoryId] = useState(0);
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState(new Date());
    const [capacity, setCapacity] = useState(20);

    const reset = () => {
        setCategoryId(0);
        setEventName("");
        setDate(new Date());
        setCapacity(20);
    }

    //  useEffect(() => {
    //      dispatch(getEvents())
    //        reset() 
    //     }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = { hostId, categoryId, eventName, date, capacity }


        dispatch(createEvent(event))
        dispatch(getEvents())
        reset();
        history.push('/events');
        return
    }

    return (
        <div className='event-form-container'>
            <form
                className='event-form'
                onSubmit={handleSubmit}
            >
                <h2>Add a New Event</h2>
                <label>
                    Event Name
                    <input
                        type='text'
                        name='name'
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Choose Date
                    <input
                        type='date'
                        name='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Event Capacity
                    <input
                        type='capacity'
                        name='capacity'
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                        required
                    />
                </label>
                <button className='submit-button' type='submit'>Submit</button>
                <NavLink to='/events' className='cancel-event-button'>Cancel</NavLink>
            </form>
        </div>
    )
}

export default CreateEventForm