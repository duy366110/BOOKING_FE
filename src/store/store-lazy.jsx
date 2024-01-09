import { createSlice } from "@reduxjs/toolkit";

const initState = {
    location: {
        elementPage: 1,
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
            
        }
    }
})

export const { initLazy } = lazySlice.actions;

export default lazySlice.reducer;