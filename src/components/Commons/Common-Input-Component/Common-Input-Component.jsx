import React from "react";
import TextField from '@mui/material/TextField';
import classes from "./Common-Input-Component.module.css";

const CommonInputComponent = (props) => {

    return (
        <div className={classes['common-input-component']}>
            <TextField id="filled-basic" label="Your e-mail" variant="filled" />
        </div>
    )
}

export default CommonInputComponent;