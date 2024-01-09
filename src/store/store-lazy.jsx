import { createSlice } from "@reduxjs/toolkit";

const initState = {
    location: {
        elementPage: 2,
        pages: []
    },

}

const lazySlice = createSlice({
    name: 'Search Slice',
    initialState: initState,
    reducers: {
        initLazy: (state, action) => {
            let {type, amount} = action.payload;

            if(type === "location") {
                let arr = Array.from({length: Math.ceil(amount / state.location.elementPage)}, (_, index) => index);
                arr.forEach((_, index) => {
                    state.location.pages.push({
                        id: index,
                        items: []
                    })
                })
            }
        },
        updateLazyPage: (state, action) => {
            let { type, id, locations } = action.payload;

            if(type === "location") {
                console.log(action.payload);
                state.location.pages = state.location.pages.map((elm) => {
                    if(elm.id.toString() === id) {
                        console.log(locations);
                        elm.items.push(...locations);
                    }
                    return elm;
                })
            }

        }
    }
})

export const { initLazy, updateLazyPage } = lazySlice.actions;

export default lazySlice.reducer;