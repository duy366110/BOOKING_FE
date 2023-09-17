import React from "react";
import { NavLink } from "react-router-dom";
import CommonButtonComponent from "../../Commons/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../Commons/Common-Input-Component/Common-Input-Component";
import classes from "./Section-Footer-Component.module.css";

const SectionFooterComponent = (props) => {

    return (
        <div className={classes['section-footer-component']}>
            <div className={classes['footer-register-email']}>
                <div className="container">
                    <h2 className={classes['title']}>Save time, save money!</h2>
                    <h3 className={classes['sub-title']}>Sign up and we'll  send the best deals to you</h3>
                    <form className={classes['form-register']}>
                        <CommonInputComponent />
                        <CommonButtonComponent name="Search" />
                    </form>
                </div>
            </div>

            <div className={classes['footer-navigator']}>
                <div className="container">
                    <div className={classes['navigator-wrapper']}>
                        <ul className={classes['navigtor-item']}>
                            <li><NavLink to="/test-01">Countries</NavLink></li>
                            <li><NavLink to="/test-01">Regions</NavLink></li>
                            <li><NavLink to="/test-01">Cities</NavLink></li>
                            <li><NavLink to="/test-01">Districts</NavLink></li>
                            <li><NavLink to="/test-01">Airports</NavLink></li>
                            <li><NavLink to="/test-01">Hotels</NavLink></li>
                        </ul>

                        <ul className={classes['navigtor-item']}>
                            <li><NavLink to="/test-01">Homes</NavLink></li>
                            <li><NavLink to="/test-01">Apartments</NavLink></li>
                            <li><NavLink to="/test-01">Resports</NavLink></li>
                            <li><NavLink to="/test-01">Villas</NavLink></li>
                            <li><NavLink to="/test-01">Hotels</NavLink></li>
                            <li><NavLink to="/test-01">Guest houses</NavLink></li>
                        </ul>

                        <ul className={classes['navigtor-item']}>
                            <li><NavLink to="/test-01">Unique places to stay</NavLink></li>
                            <li><NavLink to="/test-01">Reviews</NavLink></li>
                            <li><NavLink to="/test-01">Unpacked travel articles</NavLink></li>
                            <li><NavLink to="/test-01">Travel communities</NavLink></li>
                            <li><NavLink to="/test-01">Seasonal and holiday deals</NavLink></li>
                            <li><NavLink to="/test-01">Countries</NavLink></li>
                        </ul>

                        <ul className={classes['navigtor-item']}>
                            <li><NavLink to="/test-01">Car rental</NavLink></li>
                            <li><NavLink to="/test-01">Flight Finder</NavLink></li>
                            <li><NavLink to="/test-01">Restaurant reservations</NavLink></li>
                            <li><NavLink to="/test-01">Travel Agents</NavLink></li>
                        </ul>

                        <ul className={classes['navigtor-item']}>
                            <li><NavLink to="/test-01">Curtomer Service</NavLink></li>
                            <li><NavLink to="/test-01">Partner Help</NavLink></li>
                            <li><NavLink to="/test-01">Careers</NavLink></li>
                            <li><NavLink to="/test-01">Sustainability</NavLink></li>
                            <li><NavLink to="/test-01">Press center</NavLink></li>
                            <li><NavLink to="/test-01">Safety Resource Center</NavLink></li>
                            <li><NavLink to="/test-01">Investor relations</NavLink></li>
                            <li><NavLink to="/test-01">Terms & conditions</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionFooterComponent;