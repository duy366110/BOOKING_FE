import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
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

    // THỰC HIỆN LOADER DỰ LIỆU
    useEffect(() => {
        let { status, locations, categories, hotels } = loader;

        if(status) {
            setCategories(categories);
            setLocations(locations);
            setHotels(hotels);
        }

    }, [])

    return (
        <div className={classes['page-home-component']}>
            {/* HEADER */}
            {/* <CommonHeaderComponent header={true}/>*/}
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

// LOADER LOCATION
const loadLocation = async () => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/client/location`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// LOADER CATEGORY
const loadCategory = async () => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/client/category`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// LOADER HOTEL
const loadHotel = async () => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${configEnv.URL}/api/client/hotel`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// THỰC HIỆN LOADER THÔNG TIN TRANG CHỦ
export const loader = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let data = await Promise.all([loadLocation(), loadCategory(), loadHotel()]);
            let [{locations}, {categories}, {hotels}] = data;
            resolve({status: true , locations, categories, hotels});

        } catch (error) {
            reject({status: false, error});
        }
    })
}

