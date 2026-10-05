import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ARTILLERY_TYPES, INPUT_TYPES } from '../../Utils/artillery/constants';
import { COUNTRIES } from '../../Utils/constants';

interface InitialStateType {
  range: number;
  country: COUNTRIES;
  spa: ARTILLERY_TYPES;
  inputType: INPUT_TYPES;
}

const initialState: InitialStateType = {
  range: 100,
  country: COUNTRIES.UNITED_STATES,
  spa: ARTILLERY_TYPES.STATIONARY,
  inputType: INPUT_TYPES.DIAL,
};

export const artillerySlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<number>) => {
      state.range = action.payload;
    },
    setCountry: (state, action: PayloadAction<COUNTRIES>) => {
      state.country = action.payload;
    },
    setSPA: (state, action: PayloadAction<ARTILLERY_TYPES>) => {
      state.spa = action.payload;
    },
    setInputType: (state, action: PayloadAction<INPUT_TYPES>) => {
      state.inputType = action.payload;
    },
    appendRangeDigit: (state, action: PayloadAction<number>) => {
      state.range = state.range * 10 + action.payload;
    },
  },
});

export const { setRange, setCountry, setSPA, setInputType, appendRangeDigit } =
  artillerySlice.actions;
export default artillerySlice.reducer;
