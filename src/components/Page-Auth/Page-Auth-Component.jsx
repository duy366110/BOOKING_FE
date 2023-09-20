import React from "react";
import { Outlet } from "react-router-dom";
import SectionPopupComponent from "../sections/Section-Popup-Component/Section-Popup-Component";
import classes from "./Page-Auth-Component.module.css";

const PageAuthComponent = (props) => {

    return (
        <div className={classes['page-auth-component']}>
            <Outlet />
            <SectionPopupComponent />
        </div>
    )
}

export default PageAuthComponent;