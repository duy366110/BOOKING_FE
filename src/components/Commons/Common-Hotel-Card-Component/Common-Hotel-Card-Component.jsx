import React from "react";
import { Link } from "react-router-dom";
import configEnv from "../../../configs/config.env";
import classes from "./Common-Hotel-Card-Component.module.css";

const CommonHotelCardComponent = (props) => {

    return (
        <div className={classes['common-hotel-card-component']}>
            <Link to={`/products/${props.id}`}>
                <div className={classes['card-photo']}>
                    <img src={`${configEnv.URL}/${props.photo}`} alt="photo" />
                </div>
                <div className={classes['card-infor']}>
                    <h2 className={classes['title']}>{props.name}</h2>
                    <h3 className={classes['city']}>{props.city}</h3>
                    <h4 className={classes['price']}>Starting from ${Number(props.price).toFixed(3)}</h4>
                </div>
            </Link>
        </div>
    )
}

export default CommonHotelCardComponent;