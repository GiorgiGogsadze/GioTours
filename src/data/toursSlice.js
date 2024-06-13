import { createSlice } from "@reduxjs/toolkit";
import tours from "./tours.data";

const initialState = {
  tours: tours,
};

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    searchTour(state, action) {
      if (action.payload !== "") {
        state.tours = state.tours.filter(
          (el) =>
            (
              el.ka.title +
              el.ka.description +
              el.ka.location +
              el.ka.continent
            ).includes(action.payload) ||
            (el.en.title + el.en.description + el.en.location + el.en.continent)
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      }
    },
    fillTours(state) {
      state.tours = tours;
    },
  },
});

export default toursSlice.reducer;
export const { fillTours, searchTour } = toursSlice.actions;
