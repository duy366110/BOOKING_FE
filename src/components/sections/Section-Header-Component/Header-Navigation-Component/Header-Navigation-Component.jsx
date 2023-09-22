import React from "react";
import { NavLink } from "react-router-dom";
import HotelIcon from '@mui/icons-material/Hotel';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import classes from "./Header-Navigation-Component.module.css";

const HeaderNavigationComponent = (props) => {

    return (
        <div className={`${classes['header-navigation-component']} d-none d-md-block`}>
            <ul className={`${classes['navigation-list']} list-unstyled`}>
                <li>
                    <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/">
                        <HotelIcon /> <span>Statys</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/flight">
                    <LocalAirportIcon /> <span>Flights</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/car-rental">
                        <DirectionsCarFilledIcon /> <span>Car rentals</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/attraction">
                        <HotelIcon /> <span>Attractions</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/aiport-taxi">
                        <LocalTaxiIcon /> <span>Aiport taxis</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default HeaderNavigationComponent;