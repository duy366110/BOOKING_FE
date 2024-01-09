import classes from "./Home-Banner-Component.module.css";

const HomeBannerComponent = (props) => {

    return (
        <div className={classes['home-banner-component']}>
            <div className="container">
                <div
                    style={{backgroundImage: `url("images/banner/world-map.png")`}}
                    className={classes['banner-discount']}>
                        <img className={classes['banner-discount-thumb']} src="images/banner/badge.png" alt="" />
                        <div className={classes['banner-discount-infor']}>
                            <h2 className={classes['discount-infor-title']}>Nhận giảm giá tức thì</h2>
                            <h3 className={classes['discount-infor-sub-title']}>Chỉ cần đăng nhập tài khoản Booking.com của bạn và tìm logo Genius màu xanh dương để tiết kiệm</h3>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBannerComponent;