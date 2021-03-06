import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { login } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoUser = () => {
    return dispatch(login({ credential: 'Demo', password: 'password'}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className='events-button' to='/events'>Events</NavLink>
        <p className="user-greeting">Hello, {sessionUser.username} </p>
        <ProfileButton user={sessionUser} />
      </>
      
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className='signup-button' to="/signup">Sign Up</NavLink>
        <button onClick={demoUser} className='demo-user-login'>Demo User</button>
      </>
    );
  }

  return (
    <div className='full-page-container'>
      <div className='navbar-container'>
        <NavLink className='home-button' exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
    
  );
}

export default Navigation;