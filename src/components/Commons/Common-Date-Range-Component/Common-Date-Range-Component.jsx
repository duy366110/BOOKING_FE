import React, { useState } from "react";
import { DateRange } from 'react-date-range';
import { addDays } from "date-fns";
import classes from "./Common-Date-Range-Component.module.css";

const CommonDateRangeComponent = (props) => {

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection',
        }
    ]);

    const selectionRange = (event) => {
        props.select(event.selection);
        setRange([ event.selection ]);
    }

    return (
        <div className={classes['common-date-range-component']}>
            <DateRange
                ranges={range}
                onChange={selectionRange}
                editableDateInputs={true}
                moveRangOnFirstSelection={false}
                direction="horizontal"
            />
        </div>
    )
}

export default CommonDateRangeComponent;