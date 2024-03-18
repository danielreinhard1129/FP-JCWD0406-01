import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  id: number;
  username: string;
  email: string;
  image: string;
  branchId: number;
  isSuperAdmin: boolean;
}

const initialState: AdminState = {
  id: 0,
  username: '',
  email: '',
  image: '',
  branchId: 0,
  isSuperAdmin: false,
};

export const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginActionAdmin: (state, action: PayloadAction<AdminState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.branchId = action.payload.branchId;
      state.isSuperAdmin = action.payload.isSuperAdmin;
    },
    logoutActionAdmin: (state) => {
      state.id = 0;
      state.username = '';
      state.email = '';
      state.image = '';
      state.branchId = 0;
      state.isSuperAdmin = false;
    },
  },
});

export const { loginActionAdmin, logoutActionAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;
