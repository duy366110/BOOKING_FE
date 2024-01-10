"use strict"

const process = async (url = "", token = "",  method = "", payload = null) => {
    try {

        let res = await fetch(url, {
            method: method? method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token? token: ""
            },
            body: payload? payload : null
        })

        return await res.json();

    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
}

onmessage = async (event) => {
    let data = null;
    let {type, url, token, method, payload, options} = event.data;

    switch(type) {
        case "amount-location":
            data = await process(url);
            postMessage(data);
            break

        case "get-location":
            data = await process(url);
            postMessage(data);
            break

        case "get-home-page-infor":
        default:
            data = await Promise.allSettled([
                process(options.category.url),
                process(options.hotel.url),
            ])
            postMessage(data);
            break;
    }
}