import { useNavigate } from "react-router-dom";
import CommonButtonComponent from "../../Commons/Common-Button-Component/Common-Button-Component";
import classes from "./Section-Location-Component.module.css"

const SectionLocationComponent = (props) => {
    const navigate = useNavigate();

    const onRedirectLocationPageHandler = (event) => {
        navigate("/location");
    }
    
    return (
        <div className={classes['section-location-component']}>
            <div className="container">
                <div
                    className={classes['location-banner']}
                    style={
                        {backgroundImage: `linear-gradient(rgb(0 0 0 / 0%), rgb(0 0 0 / 43%)), url("images/attraction.jpg")`}
                    }>

                    <div className={classes['location-banner-infor']}>
                        <h2 className={classes['infor-title']}>Địa điểm nổi bật</h2>
                        <h3 className={classes['infor-sub-title']}>Tận hưởng kỳ nghỉ tuyệt vời của bạn cùng gia đình</h3>
                        <CommonButtonComponent
                            click={onRedirectLocationPageHandler}
                            name="Xem Thêm" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionLocationComponent;