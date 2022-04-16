import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navLinks.module.css';
import { useAuth } from '../context/AuthContext';


const NavLinks = props => {

  const Auth = useAuth();

  const onLogoutHandler = () => {
    Auth.logout();
  }

  const quickLoginHandler = async() => {

    if(!Auth.currentUser){

      try {
        await Auth.login("tester@tester.com", "tester");

      } catch (error) {
        console.log("Error: ", error);
      }

    }
    
  }

  return (
    <ul className={classes.nav_links}>

      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/all-countries">All-countries</NavLink>
      </li>

      

      <>
        { Auth.currentUser ? <li>
          <NavLink to="/" onClick={onLogoutHandler}>Logout</NavLink>
        </li>
        
        :

        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>}
      </>

      

      <>
        {Auth.currentUser ? 

        <li className={classes.demo_link}>
          <NavLink to="/profile" className={classes.profile_link}>Profile</NavLink>
        </li>

        :
        
        <li className={classes.demo_link}>
          <a onClick={quickLoginHandler}>TRY DEMO</a>
        </li>

        }
      </>
      
    </ul>
  )
};

export default NavLinks;