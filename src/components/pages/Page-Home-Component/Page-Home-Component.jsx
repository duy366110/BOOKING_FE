import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import ENVIRONMENT from "../../../environment";
import configEnv from "../../../configs/config.env";

import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionLocationComponent from "../../sections/Section-Location-Component/Section-Location-Component";
import SectionCategoryComponent from "../../sections/Section-Category-Component/Section-Category-Component";
import SectionHotelComponent from "../../sections/Section-Hotel-Component/Section-Hotel-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";

import classes from "./Page-Home-Component.module.css";

const PageHomeComponent = (props) => {
    const loader = useLoaderData();

    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        let { status, locations, categories, hotels } = loader;

        if(status) {
            setCategories(categories);
            setLocations(locations);
            setHotels(hotels);
        }

    }, [loader])

    return (
        <div className={classes['page-home-component']}>
            {/* HEADER */}
            <SectionHeaderComponent />

            {/* LOCATION */}
            {locations.length > 0 && (<SectionLocationComponent list={locations} />)}

            {/* CATEGORY */}
            {categories.length > 0 && (<SectionCategoryComponent list={categories} />)}

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
                    location: {
                        url: `${configEnv.URL}/api/client/location`
                    },
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
                    {value: {locations}},
                    {value: {categories}},
                    {value: {hotels}}
                ] = event.data;
                resolve({status: true , locations, categories, hotels});
            }

        } catch (error) {
            reject({status: false, error});
        }
    })
}

