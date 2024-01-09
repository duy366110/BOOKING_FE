import React, {useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import configEnv from "../../../configs/config.env";
import { authInfor } from "../../../store/store-auth";
import useValidation from "../../../hook/use-validation";
import useHttp from "../../../hook/use-http";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import CommonInputBootstrapComponent from "../../Commons/Common-Input-Bootstrap-Component/Common-Input-Bootstrap-Component";
import CommonButtonComponent from "../../Commons/Common-Button-Component/Common-Button-Component";
import classes from "./Page-Auth-Signin-Component.module.css";

const PageAuthSigninComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const { httpMethod } = useHttp();
    const { value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange } = useValidation(['require', 'email']);
    const { value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange } = useValidation(['require', 'password']);

    // NGƯỜI DÙNG ĐĂNG NHẬP
    const userSigninHandler = (event) => {
        event.preventDefault();

        let emailInput = emailRef.current.input.current;
        let passwordInput = passwordRef.current.input.current;

        emailInput.focus();
        emailInput.blur();

        passwordInput.focus();
        passwordInput.blur();

        if(emailValid.status && passwordValid.status) {
            httpMethod({
                url: `${configEnv.URL}/api/auth/signin`,
                method: 'POST',
                author: '',
                payload: JSON.stringify({email: emailValue, password: passwordValue}),
                customForm: false
            },
            (information) => {
                let { status, infor } = information;

                if(status) {
                    dispatch(authInfor({infor}));
                    navigate("/");
                }
            })
        }
    }

    return  (
        <div className={classes['page-auth-sigin-component']}>
            <SectionHeaderComponent hidden={true} />

            <div className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <form onSubmit={userSigninHandler}>
                            <h2 className={classes['form-title']}>Login</h2>
                            <CommonInputBootstrapComponent
                                ref={emailRef} type="email"
                                blur={emailBlur} change={emailChange}
                                label="E-mail *" value={emailValue} valid={emailValid} />

                            <CommonInputBootstrapComponent
                                ref={passwordRef} type="password"
                                blur={passwordBlur} change={passwordChange}
                                label="Password *" value={passwordValue} valid={passwordValid} />

                            <CommonButtonComponent with="full" type="submit" name="Login" colorRevert="color-revert" />
                            <p className={classes['form-sugget']}>Don't have account? <Link to='/auth/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageAuthSigninComponent;