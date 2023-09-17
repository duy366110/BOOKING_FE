import React from "react";
import CommonHotelCardComponent from "../../Commons/Common-Hotel-Card-Component/Common-Hotel-Card-Component";
import classes from "./Section-Hotel-Component.module.css";

const SectionHotelComponent = (props) => {

    return (
        <div className={classes['section-hotel-component']}>
            <div className="container">
                <div className="row">

                    {props.list.map((hotel) => {
                        return (
                            <div key={hotel._id} className="col-12 col-sm-6 col-lg-3 mb-5">
                                <CommonHotelCardComponent id={hotel._id} name={hotel.name} photo={hotel.images[0]} city={hotel.city.title} price={hotel.price.$numberDecimal} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default SectionHotelComponent;