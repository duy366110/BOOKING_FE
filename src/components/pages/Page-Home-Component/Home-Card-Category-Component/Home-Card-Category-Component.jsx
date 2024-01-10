import { NavLink } from "react-router-dom";
import classes from "./Home-Card-Category-Component.module.css";

const HomeCardCategoryComponent = (props) => {

    return (
        <NavLink to="/" className={classes['home-category-component']}>
            <img src={props.category.images[0]} alt="" />
            <div className={classes['home-category-infor']}>
                <h2 className={classes['title']}>{props.category.title}</h2>
                <h3 className={classes['sub-title']}>
                    Số khách sạn {props.category.collections.length} hiện có
                </h3>
            </div>
        </NavLink>
    )
}

export default HomeCardCategoryComponent;