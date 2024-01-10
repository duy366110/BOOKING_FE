import classes from "./Home-Card-Category-Component.module.css";

const HomeCardCategoryComponent = (props) => {

    return (
        <div className={classes['home-category-component']}>
            <img src={props.category.images[0]} alt="" />
        </div>
    )
}

export default HomeCardCategoryComponent;