import { useState } from 'react';
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
    const [ errors, setErrors ] = useState([]);

    const reset = () => {
        setCategoryId(0);
        setEventName("");
        setDate(new Date());
        setCapacity(20);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const event = { hostId, categoryId, eventName, date, capacity }


       return dispatch(createEvent(event))
        .then(() => history.push('/events'))
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
    console.log(errorMsg, "555555")

    return (
        <div className='event-form-page-container'>
            <div className='event-form-container'>
                <form
                    className='event-form'
                    onSubmit={handleSubmit}
                >
                    <h2>Add a New Event</h2>
                    {errorMsg}
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
        </div>
    )
}

export default CreateEventForm