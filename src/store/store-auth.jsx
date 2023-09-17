import { createSlice } from "@reduxjs/toolkit";

const initState = {
    infor: {
        fullname: '',
        email: '',
        phone: '',
        role: '',
        token: '',
        username: ''
    }
}

const authSlice = createSlice({
    name: 'Auth',
    initialState: initState,
    reducers: {
        authInfor: (state, action) => {
            let { fullname, email, phone, role, token, username } = action.payload.infor;
            localStorage.setItem('user', JSON.stringify(action.payload.infor));

            state.infor.fullname = fullname;
            state.infor.email = email;
            state.infor.phone = phone;
            state.infor.role = role;
            state.infor.token = token;
            state.infor.username = username;
        },
        authReload: (state, action) => {
            let user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                state.infor.fullname = user.fullname;
                state.infor.email = user.email;
                state.infor.phone = user.phone;
                state.infor.role = user.role;
                state.infor.token = user.token;
                state.infor.username = user.username;
            }
        },
        authLogout: (state) => {
            localStorage.clear();
            state.infor.fullname = '';
            state.infor.email = '';
            state.infor.phone = '';
            state.infor.role = '';
            state.infor.token = '';
            state.infor.username = '';
        }
    }
})

export const { authInfor, authReload, authLogout } = authSlice.actions;

export default authSlice.reducer;