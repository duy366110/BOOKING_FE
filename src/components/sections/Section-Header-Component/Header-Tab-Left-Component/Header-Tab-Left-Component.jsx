import React from "react";
import { NavLink } from "react-router-dom";
import HotelIcon from '@mui/icons-material/Hotel';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import classes from "./Header-Tab-Left-Component.module.css";

const HeaderTabLeftComponent = (props) => {

    return (
        <div className={`${classes['header-tab-left-component']} ${props.toggle? classes['active'] : ''}`}>
            <div className={classes['tab-left-mask']} onClick={props.click}></div>
            <div className={classes['tab-left-list']}>
                <h2 className={classes['logo']}>
                    <NavLink>Booking website</NavLink>
                </h2>
                <ul className={classes['navigator']}>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/"><HotelIcon /><span>Statys</span></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/flight"><LocalAirportIcon /><span>Flights</span></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/car-rental"><DirectionsCarFilledIcon /><span>Car rentals</span></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/attraction"><HotelIcon /><span>Attractions</span></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? classes["active"] : "" } to="/aiport-taxi"><LocalTaxiIcon /><span>Aiport taxis</span></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderTabLeftComponent;