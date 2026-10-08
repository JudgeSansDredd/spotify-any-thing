import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  updateHundreds: boolean;
  updateTens: boolean;
}

const initialState: InitialStateType = {
  updateHundreds: false,
  updateTens: false,
};

export const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    setUpdateHundreds: (state, action: PayloadAction<boolean>) => {
      state.updateHundreds = action.payload;
      if (action.payload) {
        state.updateTens = false;
      }
    },
    setUpdateTens: (state, action: PayloadAction<boolean>) => {
      state.updateTens = action.payload;
      if (action.payload) {
        state.updateHundreds = false;
      }
    },
  },
});

export const { setUpdateTens, setUpdateHundreds } = operationSlice.actions;
export default operationSlice.reducer;
