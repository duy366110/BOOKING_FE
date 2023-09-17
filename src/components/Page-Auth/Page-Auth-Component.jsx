import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./Page-Auth-Component.module.css";

const PageAuthComponent = (props) => {

    return (
        <div className={classes['page-auth-component']}>
            <Outlet />
        </div>
    )
}

export default PageAuthComponent;