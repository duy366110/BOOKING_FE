import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import configEnv from "../../../configs/config.env";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Transaction-Component.module.css";

const PageTransactionComponent = (props) => {
    const loader = useLoaderData();

    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    // THỰC HIỆN LOADER THÔNG TIN BÔKING TRANSACTION
    useEffect(() => {
        console.log(loader);

        let { status, message, user, bookings} = loader;
        if(status) {
            setUser(user);
            setBookings(bookings);
        }
        
    }, [])

    return (
        <div className={classes['page-transaction-component']}>
            <SectionHeaderComponent hidden={true} />

            <div className="container">
                <div className={classes["transaction-wrapper"]}>
                    { user && bookings.length > 0 && (
                        <table className={`table table-striped ${classes['table-custom']}`}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Hotel</th>
                                    <th scope="col">Room</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => {
                                    return (
                                        <tr key={booking._id}>
                                            <th scope="row">1</th>
                                            <td>{booking.hotel.name}</td>
                                            <td>{booking.roomNumbers.join(', ')}</td>
                                            <td>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</td>
                                            <td>$ {booking.price.$numberDecimal}</td>
                                            <td>$ {booking.payment}</td>
                                            <td>$ {booking.status}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}

                    {bookings.length <= 0 && (<h2 className='blank-infor'>Transaction booking blank</h2>)}
                </div>
            </div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageTransactionComponent;

// LOAD THÔNG TIN TRANSACTION CỦA NGƯỜI DÙNG
export const loader = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = JSON.parse(localStorage.getItem('user'));
            let res = await fetch(`${configEnv.URL}/api/client/booking`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `bearer ${user.token}`
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