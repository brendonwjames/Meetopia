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
        <p className="user-greeting">Hello, {sessionUser.username} </p>
        <ProfileButton user={sessionUser} />
        <NavLink to='/events'>Events</NavLink>
      </>
      
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <button onClick={demoUser} className='demo-user-login'>Demo User</button>
      </>
    );
  }

  return (
    
      <div className='navbar-container'>
        {isLoaded && sessionLinks}
        <NavLink exact to="/">Home</NavLink>
      </div>
    
  );
}

export default Navigation;