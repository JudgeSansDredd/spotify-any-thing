import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ARTILLERY_TYPES } from '../../utils/artillery/constants';
import { COUNTRIES } from '../../utils/constants';

interface InitialStateType {
  range: number;
  country: COUNTRIES;
  spa: ARTILLERY_TYPES;
}

const initialState: InitialStateType = {
  range: 0,
  country: COUNTRIES.UNITED_STATES,
  spa: ARTILLERY_TYPES.STATIONARY,
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
    appendRangeDigit: (state, action: PayloadAction<number>) => {
      state.range = state.range * 10 + action.payload;
    },
  },
});

export const { setRange, setCountry, setSPA, appendRangeDigit } =
  artillerySlice.actions;
export default artillerySlice.reducer;
