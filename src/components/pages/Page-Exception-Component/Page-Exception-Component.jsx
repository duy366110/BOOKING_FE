import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Page-Exception-Component.module.css";

const PageExceptionComponent = (props) => {

    return (
        <div className={classes['page-exception-component']}>
            <section className={classes["error-container"]}>
                <span>5</span>
                <span><span className={classes["screen-reader-text"]}>0</span></span>
                <span>0</span>
            </section>
            <p className={classes['text-des']}>Server faile please wait minutes</p>
            <div className={classes["link-container"]}>
                <NavLink to="/">Home Booking</NavLink>
            </div>
        </div>
    )
}

export default PageExceptionComponent;