import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveSearchData } from "../../../../store/store-search";
import CommonSearchInputComponent from "../../../Commons/Common-Search-Input-Component/Common-Search-Input-Component";
import CommonSearchDateRangerComponent from "../../../Commons/Common-Search-Date-Ranger-Component/Common-Search-Date-Ranger-Component";
import CommonSearchOptionComponent from "../../../Commons/Common-Search-Option-Component/Common-Search-Option-Component";
import CommonButtonComponent from "../../../Commons/Common-Button-Component/Common-Button-Component";
import classes from "./Header-Search-Component.module.css";

const HeaderSearchComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // NGƯỜI DÙNG CHUYỂN ĐẾN TRANG TÌM KIẾM THÔNG TIN
    const navigateSearchHandler = (event) => {
        dispatch(saveSearchData());
        navigate(`/search`);
    }

    return (
        <div className={classes['header-search-component']}>
            <div className={classes['search-wrapper']}>
                <form className={classes['search-form']}>
                    <div className="row w-100">
                        <div className="col-12 col-md-3 col-lg-5 mb-4 mb-md-0 pl-0 pr-1">
                            <CommonSearchInputComponent />
                        </div>

                        <div className="col-12 col-md-3 col-lg-3 mb-4 mb-md-0 px-1">
                            <CommonSearchDateRangerComponent />
                        </div>

                        <div className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0 px-1">
                            <CommonSearchOptionComponent />
                        </div>

                        <div className={`${classes['search-btn']} col-12 col-md-2 col-lg-1 pr-0 pl-1 d-flex align-items-center justify-content-center`}>
                            <CommonButtonComponent click={navigateSearchHandler} name="Search" colorRevert="color-revert" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HeaderSearchComponent;