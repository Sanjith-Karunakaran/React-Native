import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string;
  phone: string;
  address: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    resetAuth: () => initialState,
  },
});

export const { login, logout, resetAuth } = authSlice.actions;

export default authSlice.reducer;
