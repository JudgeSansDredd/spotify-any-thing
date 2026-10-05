import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  spaOpen: boolean;
}

const initialState: InitialStateType = {
  spaOpen: false,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setSPAOpen: (state, action: PayloadAction<boolean>) => {
      state.spaOpen = action.payload;
    },
    toggleSPAOpen: (state) => {
      state.spaOpen = !state.spaOpen;
    },
  },
});

export const { setSPAOpen, toggleSPAOpen } = navSlice.actions;
export default navSlice.reducer;
