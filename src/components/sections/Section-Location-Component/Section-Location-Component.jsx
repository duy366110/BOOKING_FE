import React from "react";
import configEnv from "../../../configs/config.env";
import classes from "./Section-Location-Component.module.css"

const SectionLocationComponent = (props) => {
    
    return (
        <div className={classes['section-location-component']}>
            <div className="container">
                <div className="row">
                    {props.list.map((location) => {
                        return (
                            <div key={location._id} className="col-12 col-sm-6 col-lg-4">
                                <div className={`${classes["location-wrapper"]}`}>
                                    <div className={`${classes["thumbnail"]}`}>
                                        <img src={`${configEnv.URL}/${location.images[0]}`} alt="introduction images"/>
                                    </div>
                                    <div className={`${classes["description"]}`}>
                                        <h2 className={`${classes["name"]}`}>{location.title}</h2>
                                        <p className={`${classes["infor"]}`}>{location.collections.length} properties</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SectionLocationComponent;