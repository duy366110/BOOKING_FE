import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Location-Card-Component.module.css";

const LocationCardComponent = (props) => {
    const lazy = useSelector((state) => state.lazy);

    return (
        <div className="row">
            {lazy.location.pages[props.id].items.map((location) => {
                return (
                    <div className="col-12 col-lg-4 mb-5">
                        <NavLink
                            to="/"
                            style={{backgroundImage: `linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 35%)), url("${location.images[0]}")`}}
                            className={`${classes['location-card-component']}`}>
                            <div className={classes['location-infor']}>
                                <h2 className={classes['location-infor-title']}>{location.title}</h2>
                                <h3 className={classes['location-infor-amount-hotel']}>
                                    Có {location.collections.length} khách sạn
                                </h3>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default LocationCardComponent;