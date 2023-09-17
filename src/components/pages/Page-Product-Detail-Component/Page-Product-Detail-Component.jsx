import  React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import configEnv from "../../../configs/config.env";
import { setInforHotelRoomBeforeBooking } from "../../../store/store-booking";
import RoomIcon from '@mui/icons-material/Room';
import CommonButtonComponent from "../../Commons/Common-Button-Component/Common-Button-Component";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Product-Detail-Component.module.css";

const PageProductDetailComponent = (props) => {
    const loader = useLoaderData();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [hotel, setHotel] = useState(null);
    const [room, setRoom] = useState(null);


    // PHƯƠNG THỨC LOAD THONG TIN CHI TIẾT HOTEL VÀ ROOM
    useEffect(() => {
        let { status, message, hotel, room} = loader;
        if(status) {
            setHotel(hotel);
            setRoom(room);

        }

    }, [])

    // REDIRECT ĐẾN TRANG BOOK ROOM
    const redrectPageBookingHandler = (event) => {
        let user = JSON.parse(localStorage.getItem('user'));

        if(user || auth.infor.token) {
            dispatch(setInforHotelRoomBeforeBooking({hotel, room}));
            navigate(`/product-booking/${hotel._id}/${room._id}`);

        } else {
            navigate("/auth/signin");
        }
    }

    return (
        <div className={classes['page-product-detail-component']}>
            {/* HEADER */}
            <SectionHeaderComponent hidden={true} />

            {/* CONTENT ROOM DETAIL */}
            <div className={classes['product-detail-wrapper']}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {hotel && room && (
                                <div className={classes['detail-infor']}>
                                    <h2 className={classes['name-hotel']}>Hotel - {hotel.name}</h2>
                                    <p className={classes['detail-text']}>
                                        <RoomIcon />
                                        {hotel.address}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            {room && (
                                <div className={classes['detail-photos']}>
                                    {room.images.length > 0 && room.images.map((photo, index) => {
                                        return (
                                            <div key={index} className={classes['photo-item']}>
                                                <img src={`${configEnv.URL}/${photo}`} alt="photo" />
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            {room && (
                                <div className={classes['detail-footer']}>
                                    <div className="row">
                                        <div className="col-12 col-md-8 mb-3 mb-md-0">
                                            <h3 className={classes['name-room']}>Room - {room.title}</h3>
                                            <p className={classes['detail-text']}>{room.desc}</p>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className={classes['detail-footer-price']}>
                                                <h3 className={classes['price-infor']}>
                                                    $ {Number(room.price.$numberDecimal).toFixed(3)} (1 nights)
                                                </h3>
                                                <CommonButtonComponent click={redrectPageBookingHandler} name="Reserve or Book now!" colorRevert="color-revert" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* FOOTER */}
            <SectionFooterComponent />
        </div>
    )
}

export default PageProductDetailComponent;

// LOAD THÔNG TIN CHI TIẾT ROOM CỦA HOTEL
export const loader = (request, params) => {
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