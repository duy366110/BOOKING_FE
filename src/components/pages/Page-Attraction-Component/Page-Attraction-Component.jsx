import React from "react";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionHeaderPosterComponent from "../../sections/Section-Header-Poster-Component/Section-Header-Poster-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Attraction-Component.module.css";

const PageAttractionComponent = (props) => {

    return (
        <div className={classes['page-attraction-component']}>
            <SectionHeaderComponent hidden={true} />
            <SectionHeaderPosterComponent bg="attraction" />
            
            <div className={classes['attraction-container']}></div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageAttractionComponent;