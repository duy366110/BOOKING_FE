import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import configEnv from "../../../configs/config.env";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import CommonRoomCardComponent from "../../Commons/Common-Room-Card-Component/Common-Room-Card-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Products-Component.module.css";

const PageProductsComponent = (props) => {
    const loader = useLoaderData();

    const [hotel, setHotel] = useState(null);

    // PHƯƠNG THỨC LOAD THÔNG TIN HOTEL VÀ CÁC ROOM HIỆN CÓ
    useEffect(() => {
        let {status, message, hotel} = loader;
        if(status) {
            setHotel(hotel);
        }

    }, [])

    return (
        <div className={classes['page-product-component']}>
            {/* HEADER */}
            <SectionHeaderComponent hidden={true} />

            {/* PRODUCT */}
            <div className={classes['product-wrapper']}>
                <div className="container">
                    {hotel && hotel.rooms.length > 0 && hotel.rooms.map((room) => {
                        return (
                            <CommonRoomCardComponent key={room._id} infor={room} />
                        )
                    })}
                </div>
            </div>

            {/* FOOTER */}
            <SectionFooterComponent hidden={true} />
        </div>
    )
}

export default PageProductsComponent;

// PHƯƠNG THỨC LOAD DANH SÁCH ROOM CỦA HOTEL
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {
            let { hotel } = params;
            let res = await fetch(`${configEnv.URL}/api/client/hotel/${hotel}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ''
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