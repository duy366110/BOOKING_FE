import React from "react";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionHeaderPosterComponent from "../../sections/Section-Header-Poster-Component/Section-Header-Poster-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Car-Rental-Component.module.css";

const PageCarRentalComponent = (props) => {

    return (
        <div className={classes['page-car-rental-component']}>
            <SectionHeaderComponent hidden={true} />
            <SectionHeaderPosterComponent bg="car-cental"/>
            
            <div className={classes['car-rental-container']}></div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageCarRentalComponent;