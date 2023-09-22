import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommonButtonComponent from "../Common-Button-Component/Common-Button-Component";
import classes from "./Common-Room-Card-Component.module.css";

const CommonRoomCardComponent = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    // CHUYỂ ĐẾNTRANG CHI TIẾT ROOM CỦA HOTEL
    const redirectDetailRoomOfHotel = (event) => {
        let { id } = event.target;
        let { hotel } = params;
        navigate(`/product-detail/${hotel? hotel: props.infor.hotel}/${id}`);
    }

    return (
        <div className={classes['common-room-card-component']}>
           <div className="row">
            <div className="col-12 col-md-4 col-lg-4 mb-3 mg-lg-0">
                <div className={classes['photo']}>
                    <img src={props.infor.images[0]} alt="photo" />
                </div>
            </div>
            <div className="col-12 col-md-4 col-lg-5 mb-3 mg-lg-0">
                <h2 className={classes['room-title']}>{props.infor.title}</h2>
                <p className={classes['room-max-people']}>
                    <span>Max people:</span>
                    <span>{props.infor.maxPeople}</span>
                </p>

                {props.infor.roomNumbers.length > 0 && (
                    <p className={classes['room-number']}>
                        <span>Room numbers:</span>
                        {props.infor.roomNumbers.map((roomnumber) => {
                            return (
                                <span>{roomnumber}</span>
                            )
                        })}
                    </p>
                )}
                <p className={classes['room-desc']}>{props.infor.desc}</p>
            </div>

            <div className="col-12 col-md-4 col-lg-3">
                <div className={classes['room-infor']}>
                    <h3 className={classes['room-excellent']}>
                        Excellent
                        <span>8.9</span>
                    </h3>

                    <div className={classes['room-price']}>
                        <h3 className={classes['price']}>$ {Number(props.infor.price.$numberDecimal).toFixed(3)}</h3>
                        <p>Includes taxes and fees</p>
                        <CommonButtonComponent click={redirectDetailRoomOfHotel} id={props.infor._id} name="See availability" colorRevert="color-revert" />
                    </div>
                </div>
            </div>
           </div>
        </div>
    )
}

export default CommonRoomCardComponent;