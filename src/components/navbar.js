import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.scss';

const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/dashboard" active-link>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign_out">Sign out</NavLink>
        </li>
        <li>
          <NavLink to="/shopping_history">Purchased History</NavLink>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Navbar;
