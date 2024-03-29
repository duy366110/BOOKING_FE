import React, { useEffect, useRef, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ENVIRONMENT from "../../../environment";
import configEnv from "../../../configs/config.env";
import { initLazy, updateLazyPage, resetLazy } from "../../../store/store-lazy";

import SectionHeaderComponent from "../../sections/Section-Header-Component/Section-Header-Component";
import SectionHeaderPosterComponent from "../../sections/Section-Header-Poster-Component/Section-Header-Poster-Component";
import LocationCardComponent from "./Location-Card-Component/Location-Card-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Page-Location-Component.module.css";



const PageLocationComponent = (props) => {
    const loader = useLoaderData();
    const wrapperRef = useRef();

    const dispatch = useDispatch();
    const lazy = useSelector((state) => state.lazy);

    const worker = useMemo(() => {
        return  new Worker(ENVIRONMENT.WORKER);
    }, [])
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
    }, [])

    useEffect(() => {
        let { status, amount} = loader;
        if(status) {
            dispatch(initLazy({type: "location", amount}));
            setTimeout(() => {
                const observe = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if(entry.isIntersecting) {
                            let start = entry.target.dataset.start;

                            worker.postMessage({
                                type:"get-location",
                                url: `${configEnv.URL}${ENVIRONMENT.LOCATION.ROOT}/${lazy.location.elementPage}/${start * lazy.location.elementPage}`
                            })
        
                            worker.onmessage = (event) => {
                                let {status, locations } = event.data;
                                if(status) {
                                    dispatch(updateLazyPage({type: "location", id: start, locations}));
                                }
                            }
                            observer.unobserve(entry.target);
                        }
                    })
                }, options)
        
                for(let elm of wrapperRef.current.children) {
                    observe.observe(elm);
                }

            }, 0)
        }

        return (() => {
            dispatch(resetLazy({type: "location"}));
        })

    }, [
        loader,
        dispatch,
        lazy.location.elementPage,
        options,
        worker
    ])

    return (
        <div className={classes['page-attraction-component']}>
            <SectionHeaderComponent hidden={true} />
            <SectionHeaderPosterComponent bg="attraction" />
            
            <div className={classes['attraction-container']}></div>
            <div className={classes["location-main"]}>
                <div className="container">
                    <div id="wrapper" ref={wrapperRef}>
                        {lazy.location.pages.length > 0 && lazy.location.pages.map((elm, index) => {
                            return (
                                <div key={index} data-start={elm.id} className={classes['location-container']}>
                                    <LocationCardComponent id={elm.id}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <SectionFooterComponent />
        </div>
    )
}

export default PageLocationComponent;

export const loader = () => {
    let worker = new Worker(ENVIRONMENT.WORKER);
    return new Promise((resolve, reject) => {
        try {
            worker.postMessage({
                type: "amount-location",
                url: `${configEnv.URL}${ENVIRONMENT.LOCATION.AMOUNT}`
            })

            worker.onmessage = (event) => {
                console.log(event.data);
                let { status, amount } = event.data;
                if(status) {
                    resolve({status, amount});
                }
            }

        } catch (error) {
            reject({status: false, message: error.message});
        }
    })
}