import React from "react";
import './NavBar.css';
import NavBarListItem from "./NavBarListItem";

const NavBar = () =>
    <div className={'navbar-container'}>
        <NavBarListItem text={'NewItem'}/>
    </div>

export default NavBar;