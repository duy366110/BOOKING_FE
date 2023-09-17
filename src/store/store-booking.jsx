import { createSlice } from "@reduxjs/toolkit";

const initState = {
    booking: {
        hotel: null,
        room: null
    }
}

const bookingSlice = createSlice({
    name: 'Hotel Room Slice',
    initialState: initState,
    reducers: {
        setInforHotelRoomBeforeBooking: (state, action) => {
            let { hotel, room } = action.payload;
            localStorage.setItem("booking", JSON.stringify({hotel, room}));
            state.booking.hotel = hotel;
            state.booking.room = room;
        },
        loadInforBookingReload: (state, action) => {
            let booking = localStorage.getItem('booking');
            if(booking) {
                let { hotel, room } = JSON.parse(booking);
                state.booking.hotel = hotel;
                state.booking.room = room;
            }
        }
    }
})

export const { setInforHotelRoomBeforeBooking, loadInforBookingReload } = bookingSlice.actions;

export default bookingSlice.reducer;