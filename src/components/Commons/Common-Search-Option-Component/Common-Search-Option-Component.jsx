import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import GirlIcon from '@mui/icons-material/Girl';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { setSAudlt, setSChildren, setSRoom } from "../../../store/store-search";
import classes from "./Common-Search-Option-Component.module.css";

const CommonSearchOptionComponent = (props) => {
    const dispatch = useDispatch();
    const optionRef = useRef();

    const [optionStatus, setOptionStatus] = useState(false);
    const [audlt, setAudlt] = useState(0);
    const [children, setChilrent] = useState(0);
    const [room, setRoom] = useState(0);


    // THỰC HIỆN ĐÓNG MỞ OPTION
    useEffect(() => {
        document.addEventListener('click', function(event) {
            if(optionRef.current && !optionRef.current?.contains(event.target)) {
                setOptionStatus(false);
            }
        }, true);
    })

    // THỰC HIỆN TĂNG SỐ LƯỢNG
    const addHandler = (event) => {
        let { type } = event.target.closest('#btn-add').dataset;

        switch(type) {
            case 'adult':
                let quantityAudlt = audlt + 1;
                setAudlt(quantityAudlt);
                dispatch(setSAudlt({audlt: quantityAudlt}));
                break

            case 'children':
                let quantityChildren = children + 1;
                setChilrent(quantityChildren);
                dispatch(setSChildren({children: quantityChildren}));
                break

            default:
                let quantityRoom = room + 1;
                setRoom(quantityRoom);
                dispatch(setSRoom({room: quantityRoom}));
                break;
        }
    }

    // THỰC HIỆN GIẢM SỐ LƯỢNG
    const subStractHandler = (event) => {
        let { type } = event.target.closest('#btn-substract').dataset;

        switch(type) {
            case 'adult':
                let quantityAudlt = (audlt <= 0)? 0 : (audlt - 1);
                setAudlt(quantityAudlt);
                dispatch(setSAudlt({audlt: quantityAudlt}));
                break

            case 'children':
                let quantityChildren = (children <= 0)? 0 : (children - 1);
                setChilrent(quantityChildren);
                dispatch(setSChildren({children: quantityChildren}));
                break

            default:
                let quantityRoom = (room <= 0)? 0 : (room - 1);
                setRoom(quantityRoom);
                dispatch(setSRoom({room: quantityRoom}));
                break;
        }
    }
    
    return (
        <div className={classes['common-search-option-component']}>
            <div onClick={() => setOptionStatus(!optionStatus)} className={classes['search-option-infor']}>
                <span><GirlIcon /> 0 adult</span>
                <span>0 children</span>
                <span>0 room</span>
            </div>
            { optionStatus && (<div ref={optionRef} className={classes['search-option-input']}>
                <div className={classes["option-item"]}>
                    <label className={classes['option-label']} htmlFor="adult">Adult</label>
                    <div className={classes['option-input']}>
                        <button  onClick={subStractHandler} id="btn-substract" type="button" data-type="adult"><RemoveIcon /></button>
                        <input type="text" value={audlt} />
                        <button onClick={addHandler} id="btn-add" type="button" data-type="adult"><AddIcon /></button>
                    </div>
                </div>

                <div className={classes["option-item"]}>
                    <label className={classes['option-label']} htmlFor="children">Children</label>
                    <div className={classes['option-input']}>
                        <button onClick={subStractHandler} id="btn-substract" type="button" data-type="children"><RemoveIcon /></button>
                        <input type="text" value={children} />
                        <button onClick={addHandler} id="btn-add" type="button" data-type="children"><AddIcon /></button>
                    </div>
                </div>

                <div className={classes["option-item"]}>
                    <label className={classes['option-label']} htmlFor="room">Room</label>
                    <div className={classes['option-input']}>
                        <button onClick={subStractHandler} id="btn-substract" type="button" data-type="room"><RemoveIcon /></button>
                        <input type="text" value={room} />
                        <button onClick={addHandler} id="btn-add" type="button" data-type="room"><AddIcon /></button>
                    </div>
                </div>
            </div>) }
        </div>
    )
}

export default CommonSearchOptionComponent;