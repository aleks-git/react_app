import React from 'react';
import { NavLink } from "react-router-dom";

const Menu = () => (
    <ul className="menuBlock">
        <li><NavLink exact to="/" activeClassName="actives">Home</NavLink></li>
        <li><NavLink exact to="/about" activeClassName="actives">About</NavLink></li>
        <li><NavLink exact to="/auth" activeClassName="actives">Authorization</NavLink></li>
        <li><NavLink exact to="/map" activeClassName="actives">Map</NavLink></li>
    </ul>
);

export default Menu;