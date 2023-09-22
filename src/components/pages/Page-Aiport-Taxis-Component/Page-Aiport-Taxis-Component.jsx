import React from "react";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionHeaderPosterComponent from "../../sections/Section-Header-Poster-Component/Section-Header-Poster-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Aiport-Taxis-Component.module.css";

const PageAiportTaxiComponent = (props) => {

    return (
        <div className={classes['page-aiport-taxi-component']}>
            <SectionHeaderComponent hidden={true} />
            <SectionHeaderPosterComponent bg="aiport-taxi" />
            
            <div className={classes['aiport-taxi-container']}></div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageAiportTaxiComponent;