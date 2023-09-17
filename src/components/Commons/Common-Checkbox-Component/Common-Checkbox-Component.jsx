import React from "react";
import classes from "./Common-Checkbox-Component.module.css";

const CommonCheckboxComponent = (props) => {

    return (
        <div className={classes['common-checkbox-component']}>
            <div className={`form-group form-check ${classes['form-check-custom']}`}>
                <label className={`form-check-label ${classes['form-check-label-cutom']}`} htmlFor="checkbox">{props.label}</label>
                <input
                    type="checkbox"
                    className={`form-check-input ${classes['form-check-input-custom']}`}
                    id="checkbox" value={props.value} />
            </div>
        </div>
    )
}

export default CommonCheckboxComponent;