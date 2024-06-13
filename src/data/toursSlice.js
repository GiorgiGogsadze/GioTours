import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tours: [],
};

export const getTours = async () => {
  const response = await fetch("/tours.data.json");
  const data = await response.json();
  return data.tours;
};

initialState.tours = await getTours();

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
      state.tours = initialState.tours;
    },
  },
});

export default toursSlice.reducer;
export const { fillTours, searchTour } = toursSlice.actions;
