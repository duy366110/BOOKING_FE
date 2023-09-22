import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonButtonComponent from "../../../Commons/Common-Button-Component/Common-Button-Component";
import classes from "./Header-Information-Component.module.css";

const HeaderInformationComponent = (props) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    // CHUYỂN ĐẾN TRANG ĐĂNG KÝ TÀI KHOẢN
    const navigateResgiterAccount = (event) => {
        navigate("/auth/register");
    }

    return (
        <div className={classes["header-information-component"]}>
            <h2 className={`${classes['information-title']} text-left`}>A lifetime of discount? It's genius.</h2>
            <h3 className={`${classes['information-sub-title']} text-left`}>Get rewarded for travels - unlock instant saving of 10% or more with a free account</h3>
            {!auth.infor.token && (<CommonButtonComponent click={navigateResgiterAccount} name="Register" />)}
        </div>
    )
}

export default HeaderInformationComponent;