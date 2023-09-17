import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DateRange } from 'react-date-range';
import Input from '@mui/material/Input';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from "date-fns/format";
import { addDays } from "date-fns";
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { setDate } from "../../../store/store-search";
import classes from "./Common-Search-Date-Ranger-Component.module.css";

const CommonSearchDateRangerComponent = (props) => {
    const dispatch = useDispatch();

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection',
        }
    ]);
    
    const [open, setOpen] = useState(false);
    const dateRangerRef = useRef(null)

    useEffect(() => {
        document.addEventListener('keydown', hideOnEscape, true);
        document.addEventListener('click', hideOnClickOutside, true);
    }, [open])

    // KHI NGƯỜI DÙNG NHẤN KEYBOARD ESC
    function hideOnEscape(event) {
        if(event.key === "Escape") {
            setOpen(false);
        }
    }

    // THỰC HIỆN ĐÓNG TAB KHI CLICK RA NGOÀI DATE RANGER
    function hideOnClickOutside(event) {
        if(dateRangerRef.current && !dateRangerRef.current.contains(event.target)) {
            setOpen(false);
        }
    }

    // NGƯỜI DÙNG THỰC HIỆN CHỌN START - END DATE
    function selectionRange(event) {
        let { startDate, endDate } = event.selection;
        
        setRange([ event.selection ]);
        dispatch(setDate({startDate: new Date(startDate).toLocaleString(), endDate: new Date(endDate).toLocaleString()}));
    }
      
    return (
        <div className={`${classes["common-search-data-ranger-component"]}`}>
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <CalendarMonthIcon />
                    </InputAdornment>
                }
                className={`${classes["form-date-range__input"]}`}
                value={`${format(range[0].startDate, 'MM/dd/YYY')} to ${format(range[0].endDate, 'MM/dd/YYY')}`}
                onClick={() => setOpen(!open)}
                disableUnderline={true} 
                readOnly
            />

            { open && <div className={`${classes["date-ranger"]}`} ref={dateRangerRef}>
                        <DateRange
                            ranges={range}
                            onChange={selectionRange}
                            editableDateInputs={true}
                            moveRangOnFirstSelection={false}
                            direction="horizontal"
                        />
            </div> }
        </div>
    )
}

export default CommonSearchDateRangerComponent;