import { createSlice } from "@reduxjs/toolkit";

const name = 'common';

const initialState = {
  loading: false,
  error: null,
  weather: {},
}

export const { actions: commonActions, reducer: commonReducer } = createSlice({
  name,
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    getWeather(state, action) {
      state.weather = action.payload;
    },
  }
})