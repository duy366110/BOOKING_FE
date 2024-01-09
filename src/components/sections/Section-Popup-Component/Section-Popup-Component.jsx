import React from 'react';
import { useSelector } from 'react-redux';
import CommonPopupMessageComponent from "../../Commons/Common-Popup-Component/Common-Popup-Message-Component/Common-Popup-Message-Component";
import CommonPopupLoaderComponent from "../../Commons/Common-Popup-Component/Common-Popup-Loader-Component/Common-Popup-Loader-Component";

const SectionPopupComponent = (props) => {

    const popup = useSelector((state) => state.popup);

    return (
        <div>
            {popup.message.status && (<CommonPopupMessageComponent />)}
            {popup.loader.status && (<CommonPopupLoaderComponent />)}
        </div>
    )
}

export default SectionPopupComponent;
