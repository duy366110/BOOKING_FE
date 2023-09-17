import React, { useRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import classes from './Common-Button-Component.module.css';

const CommonButtonComponent = React.forwardRef((props, ref) => {

    const buttonRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            button: buttonRef
        }
    })

    return (
        <div
            className={`
                ${classes['button-component']}
                ${props.with === 'full'? classes['width-full'] : ''}
                ${props.colorRevert === 'color-revert'? classes['color-revert'] : ''}
            `}>
            <Button ref={buttonRef} id={props.id} onClick={props.click} type={props.type} variant="contained">{props.name}</Button>
        </div>
    )
})

export default CommonButtonComponent;
