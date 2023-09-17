import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hook/use-http";
import CommonButtonComponent from "../../Commons/Common-Button-Component/Common-Button-Component";
import CommonSearchInputComponent from "../../Commons/Common-Search-Input-Component/Common-Search-Input-Component";
import CommonSearchDateRangerComponent from "../../Commons/Common-Search-Date-Ranger-Component/Common-Search-Date-Ranger-Component";
import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import CommonRoomCardComponent from "../../Commons/Common-Room-Card-Component/Common-Room-Card-Component";
import classes from "./Page-Search-Component.module.css";

const PageSearchComponent = (props) => {
    const search = useSelector((state) => state.search);

    const { httpMethod } = useHttp();

    const [rooms, setRooms] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [audlt, setAudlt] = useState(0);
    const [children ,setChildren] = useState(0);
    const [room, setRoom] = useState(0);

    // PHƯƠNG THỨC THAY ĐỔI THÔNG TIN TÌM KIẾM
    const changeMinPriceHandler = (event) => { setMinPrice(event.target.value) }
    const changeMaxPriceHandler = (event) => { setMaxPrice(event.target.value) }
    const changeAudltHandler = (event) => { setAudlt(event.target.value) }
    const changeChildrenHandler = (event) => { setChildren(event.target.value) }
    const changeRoomHandler = (event) => { setRoom(event.target.value) }

    // PHƯƠNG THỨC THỰC HIỆN TÌM KIẾM
    const searchHandler = (payload) => {
        httpMethod({
            url: 'http://localhost:5000/api/search/hotel',
            method: 'POST',
            author: '',
            payload: JSON.stringify(payload),
            customForm: false
        },
            (infor) => {
            let { code, status, message, metadata } = infor;

            if(status) {
                const { rooms } = metadata;
                setRooms(rooms);
            }
        })
    }

    // THỰC HIỆN LOAD THÔNG TIN CẦN TÌM KIẾM
    useEffect(() => {
        const localSearch = JSON.parse(localStorage.getItem('search'));
        let { location, startDate, endDate, audlt, children, room } = search.data;

        if(!location && localSearch) {
            location = localSearch.location;
            startDate = localSearch.startDate;
            endDate = localSearch.endDate;
            audlt = localSearch.audlt;
            children = localSearch.children;
            room = localSearch.room;
        }

        let searchInfor = {
            location, startDate,
            endDate, audlt,
            children, room
        }

        localStorage.setItem('search', JSON.stringify(searchInfor));
        searchHandler(searchInfor);

    }, [])

    // PHƯƠNG THỨC THỰC HIỆN TÌM KIẾM
    const serachHandler = (event) => {
        event.preventDefault();
        let { location, startDate, endDate} = search.data;

        let searchInfor = {
            location, startDate,
            minPrice, maxPrice,
            endDate, audlt,
            children, room
        }

        searchHandler(searchInfor);

    }

    return (
        <div className={classes['page-search-component']}>
            <SectionHeaderComponent hidden={true} />

            <div className={classes['search-wrapper']}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                            <form onSubmit={serachHandler}>
                                <div className={classes['search-tab']}>
                                    <div className={`${classes['search-tab-conteller']} mb-3`}>
                                        <label className={classes['search-tab-label']} htmlFor="destination">Destination</label>
                                        <CommonSearchInputComponent />
                                    </div>

                                    <div className={`${classes['search-tab-conteller']} mb-3`}>
                                        <label className={classes['search-tab-label']} htmlFor="date">Check-in date</label>
                                        <CommonSearchDateRangerComponent />
                                    </div>

                                    <div className={`${classes['search-tab-conteller']} mb-3`}>
                                        <label className={classes['search-tab-label']} htmlFor="date">Options</label>
                                        <ul className={classes['search-list-options']}>
                                            <li>
                                                <label htmlFor="optins">Min price per night</label>
                                                <input type="number" onChange={changeMinPriceHandler} value={minPrice}/>
                                            </li>
                                            <li>
                                                <label htmlFor="optins">Max price per night</label>
                                                <input type="number" onChange={changeMaxPriceHandler} value={maxPrice}/>
                                            </li>
                                            <li>
                                                <label htmlFor="optins">Audlt</label>
                                                <input type="number" onChange={changeAudltHandler} value={audlt}/>
                                            </li>
                                            <li>
                                                <label htmlFor="optins">Children</label>
                                                <input type="number" onChange={changeChildrenHandler} value={children}/>
                                            </li>
                                            <li>
                                                <label htmlFor="optins">Room</label>
                                                <input type="number" onChange={changeRoomHandler} value={room}/>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={classes['search-tab-btn']}>
                                        <CommonButtonComponent type="submit" name="Search" colorRevert="color-revert" />
                                    </div>

                                </div>
                            </form>
                        </div>

                        <div className="col-12 col-lg-8">
                            {rooms.length > 0 && rooms.map((room) => {
                                return (
                                    <CommonRoomCardComponent key={room._id} infor={room}/>
                                )
                            })}

                            {rooms.length <= 0 && (<h2 className='blank-infor'>Transaction booking blank</h2>)}
                        </div>
                    </div>
                </div>
            </div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageSearchComponent;