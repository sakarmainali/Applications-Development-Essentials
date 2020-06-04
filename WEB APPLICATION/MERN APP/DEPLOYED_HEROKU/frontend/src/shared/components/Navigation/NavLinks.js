import React, { useContext } from 'react';
import { NavLink,Link  } from 'react-router-dom';



import UserNav from './UserNav';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';


const NavLinks = props => {
  const auth = useContext(AuthContext);
  console.log(auth.userId);
  console.log(auth.username);

  console.log(auth.token);
  console.log(auth.nsum);
  return (
    <ul className="nav-links">

      
      <li>
        <NavLink to="/summary" exact>
           EXPLORE SUMMARIES
        </NavLink>
      </li>
      
      {auth.isLoggedIn && (
        <li>
        <NavLink to="/" exact>
          EXPLORE WRITERS
        </NavLink>
      </li>
      )}


{auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/summaries`}>MY SUMMARY</NavLink>
        </li>
      )}

{auth.isLoggedIn && (
        <li>
          <NavLink to="/summary/new">ADD SUMMARY</NavLink>
        </li>
      )}


      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
        
      )}


      {auth.isLoggedIn && (
        <li>
          <UserNav
          key={auth.userId}
          id={auth.userId}
          image={auth.pimg}
          name={auth.username}
          placeCount={auth.nsum!= undefined && (auth.nsum) }
        />
        </li>
        
      )}

    

    
      
   
    </ul>
  );
};


export default NavLinks;
