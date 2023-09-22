import React from "react";
import classes from "./Section-Header-Poster-Component.module.css";

const SectionHeaderPosterComponent = (props) => {

    return (
        <div className={classes['section-header-poster-component']} style={{backgroundImage: `url("images/${props.bg}.jpg")`}}>
            
        </div>
    )
}

export default SectionHeaderPosterComponent;