import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../../../../store/store-auth";
import CommonButtonComponent from "../../../Commons/Common-Button-Component/Common-Button-Component";
import classes from "./Header-Actions-Component.module.css";

const HeaderActionsComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [humburgerStatus, setHumburgerStatus] = useState(false);

    // OPEN TAB LEFT
    const hanburgerHandler = (event) => {
        setHumburgerStatus(!humburgerStatus);
        props.click();
    }

    // LOAD TRANG THAI ĐÓNG TAB LEFT VÀ HAMBURGER
    useEffect(() => {
        setHumburgerStatus(props.closeTabLeft);
    }, [props.closeTabLeft])

    // NGƯỜI DÙNG ĐĂNG NHẬP
    const userSigninHandler = (event) => {
        navigate("/auth/signin");
    }

    // NGƯỜI DÙNG ĐĂNG KÝ
    const userRegisterHandler = (event) => {
        navigate("/auth/register");
    }

    // NGƯỜI DÙNG CHUYỂN ĐẾN TRANG TRANSACTION
    const userTransactionHandler = (event) => {
        navigate(`/transaction/${auth.infor.token}`);
    }

    // NGƯỜI DÙNG ĐĂNG XUẤT
    const userLogoutHandler = (event) => {
        dispatch(authLogout());
        navigate("/");
    }

    return (
        <div className={classes['header-actions-component']}>
            <div className="row">
                <div className="col-6 col-lg-4 d-flex align-items-center">
                    <h1 className={classes['header-logo']}>
                        <Link to="/">Booking website</Link>
                    </h1>
                </div>

                <div className="col-6 col-lg-8 d-flex align-items-center justify-content-end">
                    <div className={`${classes['header-actions']} d-none d-md-flex align-items-md-center`}>
                        {!auth.infor.token && (
                            <>
                                <CommonButtonComponent click={userRegisterHandler} name="Register" />
                                <CommonButtonComponent click={userSigninHandler} name="Login" />
                            </>
                        )}

                        {auth.infor.token && (
                            <>
                                <h3 className={classes['header-user-email']}>{auth.infor.email}</h3>
                                <CommonButtonComponent click={userTransactionHandler} name="Transaction" />
                                <CommonButtonComponent click={userLogoutHandler} name="Logout" />
                            </>
                        )}
                    </div>

                    <button onClick={hanburgerHandler} className={`${classes['header-hamburger']} ${humburgerStatus? classes['active'] : ''} d-block d-md-none`}>
                        <span/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderActionsComponent;