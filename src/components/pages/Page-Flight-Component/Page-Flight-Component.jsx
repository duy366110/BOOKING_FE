import React from "react";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionHeaderPosterComponent from "../../sections/Section-Header-Poster-Component/Section-Header-Poster-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Flight-Component.module.css";

const PageFlightComponent = (props) => {

    return (
        <div className={classes['page-flight-component']}>
            <SectionHeaderComponent hidden={true} />
            <SectionHeaderPosterComponent bg="flight" />

            <div className={classes['fligh-container']}></div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageFlightComponent;