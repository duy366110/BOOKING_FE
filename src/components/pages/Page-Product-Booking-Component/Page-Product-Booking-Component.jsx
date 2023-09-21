import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import configEnv from "../../../configs/config.env";
import useValidation from "../../../hook/use-validation";
import useHttp from "../../../hook/use-http";
import moment from "moment";
import CommonButtonComponent from "../../Commons/Common-Button-Component/Common-Button-Component";
import CommonInputBootstrapComponent from "../../Commons/Common-Input-Bootstrap-Component/Common-Input-Bootstrap-Component";
import CommonCheckboxComponent from "../../Commons/Common-Checkbox-Component/Common-Checkbox-Component";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import CommonDateRangeComponent from "../../Commons/Common-Date-Range-Component/Common-Date-Range-Component";
import CommonSelectComponent from "../../../components/Commons/Common-Select-Component/Common-Select-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Product-Booking-Component.module.css";

let PAYMENTS = [
    {_id: 'MasterCard', name: 'MasterCard'},
    {_id: 'Visa', name: 'Visa'},
    {_id: 'UnionPay', name: 'UnionPay'},
    {_id: 'Discover', name: 'Discover'},
]

const PageProductBookingComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const auth = useSelector((state) => state.auth);

    const fullNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const cardRef = useRef();
    const paymentRef = useRef();

    const { httpMethod } = useHttp();
    const {defaultValue: fullNameDef, value: fullNameValue, valid: fullNameValid, onBlur: fullNameBlur, onChange: fullNameChange} = useValidation(['require']);
    const {defaultValue: emailDef, value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange} = useValidation(['require', 'email']);
    const {defaultValue: phoneDef, value: phoneValue, valid: phoneValid, onBlur: phoneBlur, onChange: phoneChange} = useValidation(['require', "phone"]);
    const {value: cardValue, valid: cardValid, onBlur: cardBlur, onChange: cardChange} = useValidation(['require']);
    const {value: paymentValue, valid: paymentValid, onBlur: paymentBlur, onChange: paymentChange} = useValidation(['require']);
    

    const [hotel, setHotel] = useState(null);
    const [room, setRoom] = useState(null);

    const [submit, setSubmit] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomStatus, setRoomStatus] = useState(false);
    const [quantityBookingStatus, setQuantiyBookingStatus] = useState(false);

    // THỰC HIỆN LOAD THÔNG TIN HOTEL - ROOM
    useEffect(() => {
        let { status, message, hotel} = loader;

        if(status && auth.infor.token) {

            // BINDING THÔNG TIN HOTEL AND ROOM
            setHotel(hotel);
            setRoom(hotel.rooms[0]);

            // BINDING THÔNG TIN USER
            fullNameDef(auth.infor.fullname);
            emailDef(auth.infor.email);
            phoneDef(auth.infor.phone);
        }

    }, [])

    const selectDateBookingHandler = (date) => {
        let { startDate, endDate} = date;
        setStartDate(new Date(startDate).toLocaleString());
        setEndDate(new Date(endDate).toLocaleString());
    }

    // THỰC HIỆN ĐẶT PHÒNG
    const bookingHandler = (event) => {
        event.preventDefault();

        const fullNameInput = fullNameRef.current.input.current;
        fullNameInput.focus();
        fullNameInput.blur();

        let emailInput = emailRef.current.input.current;
        emailInput.focus();
        emailInput.blur();

        let phoneInput = phoneRef.current.input.current;
        phoneInput.focus();
        phoneInput.blur();

        let cardInput = cardRef.current.input.current;
        cardInput.focus();
        cardInput.blur();

        let paymentSelect = paymentRef.current.select.current;
        paymentSelect.focus();
        paymentSelect.blur();

        let checkboxs = document.querySelectorAll(`input[type='checkbox']`);

        // KIỂM TRA NGÀY ĐẶT PHÒNG
        let quantityBooking = 0;
        if(startDate && endDate) {
            let start = moment(startDate);
            let end = moment(endDate);

            quantityBooking = end.diff(start, 'days');
            setQuantiyBookingStatus(false);

        } else {
            setQuantiyBookingStatus(true);
        }
        
        // KIỂM TRA VIỆC CHỌN PHÒNG
        let roomNumbers = [];
        for(let checkbox of checkboxs) {
            if(checkbox.checked) {
                roomNumbers.push(checkbox.value);
            }
        }

        if(!roomNumbers.length) {
            setRoomStatus(true);

        } else {
            setRoomStatus(false);
        }


        if((fullNameValid.status && emailValid.status) &&
            (phoneValid.status && cardValid.status) && (paymentValid.status && quantityBooking) && roomNumbers) {

                let user = localStorage.getItem('user');

                if(user) {
                    user = JSON.parse(user);

                    let booking = {
                        hotel: hotel._id,
                        room: room._id,
                        token: user.token,
                        fullName: fullNameValue,
                        email: emailValue,
                        phone: phoneValue,
                        card: cardValue,
                        payment: paymentValue,
                        startDate: startDate,
                        endDate: endDate,
                        quantityDateBooking: (quantityBooking + 1),
                        roomNumbers: roomNumbers
                    }
    
                    console.log(booking);

                    httpMethod({
                        url: `${configEnv.URL}/api/client/booking/hotel/room`,
                        method: 'POST',
                        author: '',
                        payload: JSON.stringify(booking),
                        customForm: false
                    },
                    (information) => {
                        let { status, message, infor } = information;
        
                        if(status) {
                            navigate("/transaction");
                        }
                    })

                } else {
                    // YÊU CẦU NGƯỜI DÙNG ĐĂNG NHẬP THỰC HIỆN CHỨC NĂNG
                    navigate("/auth/signin");
                }
        }
    }

    return (
        <div className={classes['page-product-Booking-component']}>
            {/* HEADER */}
            <SectionHeaderComponent hidden={true} />

            {/* FORM BOOKING */}
            <div className={classes['product-booking-wrapper']}>
                <div className="container">
                    { submit && !startDate && !endDate && (<h2 className={classes['booking-range-data-message']}>Place select data booking</h2>)}
                    <form onSubmit={bookingHandler}>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 mb-5 mb-md-0">
                                <h2 className={classes['booking-title']}>Dates</h2>
                                <CommonDateRangeComponent select={selectDateBookingHandler} />
                                { quantityBookingStatus && (<small className={classes['message-booking']}>Please select start - end date booking</small>)}
                            </div>
                            <div className="col-12 col-md-6 col-lg-7">
                                <h2 className={classes['booking-title']}>Reserve info</h2>
                                <CommonInputBootstrapComponent
                                    ref={fullNameRef}
                                    placeholder="Full name"
                                    blur={fullNameBlur} change={fullNameChange}
                                    label="Your Full Name *" value={fullNameValue} valid={fullNameValid} />

                                <CommonInputBootstrapComponent
                                    ref={emailRef}
                                    placeholder="Email"
                                    blur={emailBlur} change={emailChange}
                                    label="Your Email *" value={emailValue} valid={emailValid} />


                                <CommonInputBootstrapComponent
                                    ref={phoneRef}
                                    placeholder="Phone Number"
                                    blur={phoneBlur} change={phoneChange}
                                    label="Your Phone Number *" value={phoneValue} valid={phoneValid} />


                                <CommonInputBootstrapComponent
                                    ref={cardRef}
                                    placeholder="Card Number"
                                    blur={cardBlur} change={cardChange}
                                    label="Your Identity Car Number *" value={cardValue} valid={cardValid} />
                            </div>

                            <div className="col-12 mt-5">
                                <h2 className={classes['booking-title']}>Select Rooms</h2>
                                {hotel && room && (
                                    <div className={classes['room-wrapper']}>
                                        <div className={classes['room-infor']}>
                                            <h3 className={classes['booking-room-hotel-name']}>{hotel.name}</h3>
                                            <h3 className={classes['booking-room-name']}>{room.title}</h3>
                                            <p className={classes['booking-room-policy']}>{room.desc}</p>
                                            <p className={classes['booking-room-max-people']}>Max people:<span>{room.maxPeople}</span></p>
                                            <p className={classes['booking-room-price']}>$ {Number(room.price.$numberDecimal).toFixed(3)}</p>
                                        </div>

                                        <div className={classes['room-list-wrapper']}>
                                            <div className={classes['room-list']}>
                                                {room.roomNumbers.length > 0 && room.roomNumbers.map((numRoom, index) => {
                                                    return (
                                                        <CommonCheckboxComponent key={index} label={numRoom} value={numRoom} />
                                                    )
                                                })}
                                            </div>
                                            { roomStatus && (<small className={classes['message-booking']}>Please select room hotel before booking</small>)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-12">
                                <div className={classes['payment-options']}>
                                    <CommonSelectComponent
                                        ref={paymentRef} options={PAYMENTS}
                                        valueDefaultOption={'Choose payment...'}
                                        blur={paymentBlur} change={paymentChange}
                                        value={paymentValue} valid={paymentValid} />
                                    <CommonButtonComponent type="submit" name="Reserve now" colorRevert="color-revert" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* FOOTER */}
            <SectionFooterComponent />
        </div>
    )
}

export default PageProductBookingComponent;

// LOADER THÔNG TIN HOTEL VÀ ROOM THỰC HIỆN BOOKING SẢN PHẦM
export const loader = (request, params) =>  {
    return new Promise( async (resolve, reject) => {
        try {
            let { hotel, room} = params;
            let res = await fetch(`${configEnv.URL}/api/client/hotel/${hotel}/${room}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ""
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}