import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import ENVIRONMENT from "../../../environment";
import configEnv from "../../../configs/config.env";

import HomeBannerComponent from "./Home-Banner-Component/Home-Banner-Component";
import HomeCardCategoryComponent from "./Home-Card-Category-Component/Home-Card-Category-Component";

import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionLocationComponent from "../../sections/Section-Location-Component/Section-Location-Component";
import SectionCarouselComponent from "../../sections/Section-Carousel-Component/Section-Carousel-Component";
import SectionHotelComponent from "../../sections/Section-Hotel-Component/Section-Hotel-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";

import classes from "./Page-Home-Component.module.css";

const PageHomeComponent = (props) => {
    const loader = useLoaderData();

    const [categories, setCategories] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        let { status, categories, hotels } = loader;

        if(status) {
            setCategories(categories);
            setHotels(hotels);
        }

    }, [loader])

    return (
        <div className={classes['page-home-component']}>
            {/* HEADER */}
            <SectionHeaderComponent />

            {/* LOCATION */}
            <SectionLocationComponent />

            {/* CATEGORY */}
            <div className="container">
                <h2 className={classes['page-home-title']}>Loại hình thuê</h2>
                <h3 className={classes['page-home-sub-title']}>Đa dạng loại hình lựa chọn</h3>
            
                {categories.length > 0 && (
                    <SectionCarouselComponent>
                        {categories.map((category) => {
                            return(
                                <HomeCardCategoryComponent category={category}/>
                            )
                        })}
                    </SectionCarouselComponent>
                )}
            </div>

            <HomeBannerComponent />

            {/* LIST HOTEL */}
            {hotels.length > 0 && (<SectionHotelComponent list={hotels} />)}

            {/* FOOTER */}
            <SectionFooterComponent />
        </div>
    )
}

export default PageHomeComponent;

// LOAD INFORMATIN
export const loader = () => {
    const worker = new Worker(ENVIRONMENT.WORKER);
    return new Promise( async(resolve, reject) => {
        try {
            worker.postMessage({
                type: "get-home-page-infor",
                options: {
                    category: {
                        url: `${configEnv.URL}/api/client/category`
                    },
                    hotel: {
                        url: `${configEnv.URL}/api/client/hotel`
                    }
                }
            })

            worker.onmessage = (event) => {
                let [
                    {value: {categories}},
                    {value: {hotels}}
                ] = event.data;
                resolve({status: true , categories, hotels});
            }

        } catch (error) {
            reject({status: false, error});
        }
    })
}

