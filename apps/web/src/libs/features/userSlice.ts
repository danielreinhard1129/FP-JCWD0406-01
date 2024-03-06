import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  role: string;
  email: string;
  isVerified: boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  role: '',
  isVerified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isVerified = action.payload.isVerified;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.name = '';
      state.email = '';
      state.role = '';
      state.isVerified = false;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
