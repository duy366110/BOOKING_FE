import { createSlice } from "@reduxjs/toolkit";

const initState = {
    data: {
        location: '',
        startDate: '',
        endDate: '',
        audlt: 0,
        children: 0,
        room: 0
    }
}

const searchSlice = createSlice({
    name: 'Search Slice',
    initialState: initState,
    reducers: {
        setLocation: (state, action) => {
            state.data.location = action.payload.location;
        },
        setDate: (state, action) => {
            let { startDate, endDate } = action.payload;
            state.data.startDate = startDate;
            state.data.endDate = endDate;
        },
        setSAudlt: (state, action) => {
            state.data.audlt = action.payload.audlt;
        },
        setSChildren: (state, action) => {
            state.data.children = action.payload.children;
        },
        setSRoom: (state, action) => {
            state.data.room = action.payload.room;
        },
        saveSearchData: (state, action) => {
            localStorage.setItem('search', JSON.stringify(state.data));
        }
    }
})

export const { setLocation, setDate, setSAudlt, setSChildren, setSRoom, saveSearchData } = searchSlice.actions;

export default searchSlice.reducer;