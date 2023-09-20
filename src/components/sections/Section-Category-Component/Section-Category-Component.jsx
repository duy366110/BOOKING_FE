import React from "react";
import configEnv from "../../../configs/config.env";
import classes from "./Section-Category-Component.module.css"

const SectionCategoryComponent = (props) => {
    
    return (
        <div className={classes['section-category-component']}>
            <div className="container">
                <div className={classes['category-wrapper']}>
                    {props.list.map((category) => {
                        return (
                            <div key={category._id} className={classes["category-items"]}>
                                <div className={classes["category-item__photo"]}>
                                    <img src={category.images[0]} alt="photo" />
                                </div>

                                <div className={classes["category-item__infor"]}>
                                    <h2 className={classes["title"]}>{category.title}</h2>
                                    <p className={classes["collection"]}>{category.collections.length} {category.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SectionCategoryComponent;