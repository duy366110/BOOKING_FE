import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import configEnv from "../../../configs/config.env";
import { authInfor } from "../../../store/store-auth";
import useHttp from '../../../hook/use-http';
import useValidation from '../../../hook/use-validation';
import SectionHeaderComponent from '../../sections/Section-Header-Component/Section-Header-Component';
import CommonInputBootstrapComponent from '../../Commons/Common-Input-Bootstrap-Component/Common-Input-Bootstrap-Component';
import CommonButtonComponent from '../../Commons/Common-Button-Component/Common-Button-Component';
import classes from "./Page-Auth-Register-Component.module.css";

const PageAuthRegisterComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userNameRef = useRef();
    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();

    const { httpMethod } = useHttp();
    const { value: userNameValue, valid: userNameValid, onBlur: userNameBlur, onChange: userNameChange } = useValidation(['require']);
    const { value: fullNameValue, valid: fullNameValid, onBlur: fullNameBlur, onChange: fullNameChange } = useValidation(['require']);
    const { value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange } = useValidation(['require', 'email']);
    const { value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange } = useValidation(['require', 'password']);
    const { value: phoneValue, valid: phoneValid, onBlur: phoneBlur, onChange: phoneChange } = useValidation(['require', 'phone']);

    // NGƯỜI DÙNGDĂNG KÝ TÀI KHOẢN
    const userRegisterHandler = (event) => {
        event.preventDefault();

        let userNameInput = userNameRef.current.input.current;
        userNameInput.focus();
        userNameInput.blur();

        let fullNameInput = fullNameRef.current.input.current;
        fullNameInput.focus();
        fullNameInput.blur();

        let emailInput = emailRef.current.input.current;
        emailInput.focus();
        emailInput.blur();

        let passwordInput = passwordRef.current.input.current;
        passwordInput.focus();
        passwordInput.blur();

        let phoneInput = phoneRef.current.input.current;
        phoneInput.focus();
        phoneInput.blur();

        if(userNameValid.status && (fullNameValid.status && emailValid.status) && (passwordValid.status && phoneValid.status)) {
            httpMethod({
                url: `${configEnv.URL}/api/client/user/account`,
                method: 'POST',
                author: '',
                payload: JSON.stringify({
                    username: userNameValue,
                    fullname: fullNameValue,
                    email: emailValue,
                    password: passwordValue,
                    phone: phoneValue
                }),
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

    return (
        <div className={classes['page-auth-register-component']}>
            <SectionHeaderComponent hidden={true} />
            <div className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className='col-12 col-md-6'>
                        <form onSubmit={userRegisterHandler}>
                            <h2 className={classes['form-title']}>Sign up</h2>

                            <CommonInputBootstrapComponent
                                    type="text"
                                    ref={userNameRef}
                                    blur={userNameBlur} change={userNameChange}
                                    label="User name *" value={userNameValue} valid={userNameValid} />

                            <CommonInputBootstrapComponent
                                    type="text"
                                    ref={fullNameRef}
                                    blur={fullNameBlur} change={fullNameChange}
                                    label="Full name *" value={fullNameValue} valid={fullNameValid} />
                            
                            <CommonInputBootstrapComponent
                                    type="email"
                                    ref={emailRef}
                                    blur={emailBlur} change={emailChange}
                                    label="E-mail *" value={emailValue} valid={emailValid} />

                            <CommonInputBootstrapComponent
                                type="password"
                                ref={passwordRef}
                                blur={passwordBlur} change={passwordChange}
                                label="Password *" value={passwordValue} valid={passwordValid} />

                            <CommonInputBootstrapComponent
                                    type="phone"
                                    ref={phoneRef}
                                    blur={phoneBlur} change={phoneChange}
                                    label="Phone *" value={phoneValue} valid={phoneValid} />

                            <CommonButtonComponent with="full" type="submit" name="Register" colorRevert="color-revert"/>
                            <p className={classes['form-sugget']}>Don't have account? <Link to='/auth/signin'>Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageAuthRegisterComponent;