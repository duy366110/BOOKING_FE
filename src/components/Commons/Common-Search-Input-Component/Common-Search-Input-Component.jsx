import React, { useState } from "react";
import Input from '@mui/material/Input';
import { useDispatch } from "react-redux";
import InputAdornment from '@mui/material/InputAdornment';
import { setLocation } from "../../../store/store-search";
import HotelIcon from '@mui/icons-material/Hotel';
import classes from "./Common-Search-Input-Component.module.css";

const CommonSearchInputComponent = (props) => {
    const dispatch = useDispatch();

    const [serachInput, setSearchInput] = useState('');
    
    /// NGƯỜI DÙNG THAY ĐỔI GIÁ TRỊ TRONG SEẢCH BOX
    const changeSearchHandler = (event) => {
        let val = event.target.value;
        setSearchInput(val);
    }

    // NGƯỜI DUNG BLUR KHỎI SEẢCH BOX
    const blurSearchHandler = (event) => {
        // props.blur(serachInput);
        dispatch(setLocation({location: serachInput}))
    }

    return (
        <div className={classes['common-search-input-component']}>
            <Input id="input-with-icon-adornment"
            onBlur={blurSearchHandler}
            onChange={changeSearchHandler}
            placeholder="Where are you going?"
                startAdornment={
                    <InputAdornment position="start">
                        <HotelIcon />
                    </InputAdornment>
                }/>
        </div>
    )
}

export default CommonSearchInputComponent;

