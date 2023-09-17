import React, { useState } from "react";
import HeaderActionsComponent from "./Header-Actions-Component/Header-Actions-Component";
import HeaderNavigationComponent from "./Header-Navigation-Component/Header-Navigation-Component";
import HeaderInformationComponent from "./Header-Information-Component/Header-Information-Component";
import HeaderSearchComponent from "./Header-Search-Component/Header-Search-Component";
import HeaderTabLeftComponent from "./Header-Tab-Left-Component/Header-Tab-Left-Component";
import classes from "./Section-Header-Component.module.css";

const SectionHeaderComponent = (props) => {

    const [tabLeft, setTabLeft] = useState(false);

    // MỞ TAB LEFT
    const openTabLeft = (event) => {
        setTabLeft(true);
    }

    // ĐÓNG TAB LEFT
    const closeTabLeft = (event) => {
        setTabLeft(false);
    }

    return (
        <header className={classes['section-header-component']}>
            <div className="container">
                {/* ACTION */}
                <HeaderActionsComponent click={openTabLeft} closeTabLeft={tabLeft} />

                {/* NAVIGATION */}
                <HeaderNavigationComponent />

                {/* INFORMATION */}
                {!props.hidden && (
                    <HeaderInformationComponent />
                )}

                {/* SEARCH */}
                {!props.hidden && (
                    <HeaderSearchComponent />
                )}

                {/* TAB LEFT */}
                <HeaderTabLeftComponent toggle={tabLeft} click={closeTabLeft}/>
                
            </div>
        </header>
    )
}

export default SectionHeaderComponent;