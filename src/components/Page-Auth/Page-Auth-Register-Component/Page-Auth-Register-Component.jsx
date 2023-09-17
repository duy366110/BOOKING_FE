import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
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

    const emailRef = useRef();
    const passwordRef = useRef();

    const { httpMethod } = useHttp();
    const { value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange } = useValidation(['require', 'email']);
    const { value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange } = useValidation(['require', 'password']);

    // NGƯỜI DÙNGDĂNG KÝ TÀI KHOẢN
    const userRegisterHandler = (event) => {
        event.preventDefault();

        let emailInput = emailRef.current.input.current;
        emailInput.focus();
        emailInput.blur();

        let passwordInput = passwordRef.current.input.current;
        passwordInput.focus();
        passwordInput.blur();

        if(emailValid.status && passwordValid.status) {
            httpMethod({
                url: 'http://localhost:5000/api/client/user/account',
                method: 'POST',
                author: '',
                payload: JSON.stringify({email: emailValue, password: passwordValue}),
                customForm: false
            },
            (information) => {
                let { status, message, infor } = information;

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
                                    type="email"
                                    ref={emailRef}
                                    blur={emailBlur} change={emailChange}
                                    label="E-mail *" value={emailValue} valid={emailValid} />

                            <CommonInputBootstrapComponent
                                type="password"
                                ref={passwordRef}
                                blur={passwordBlur} change={passwordChange}
                                label="Password *" value={passwordValue} valid={passwordValid} />

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