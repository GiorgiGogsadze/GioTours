import { createSlice } from "@reduxjs/toolkit";
import toursData from "./tours.data";

const initialParameters = {
  search: "",
  continent: "all",
  season: "all",
  transport: "all",
  sort: "none",
};
const initialState = {
  tours: toursData,
  parameters: initialParameters,
};

function doAll(parameters) {
  let tours = toursData;
  if (parameters.search !== "") {
    tours = tours.filter(
      (el) =>
        (
          el.ka.title +
          el.ka.description +
          el.ka.location +
          el.ka.continent
        ).includes(parameters.search) ||
        (el.en.title + el.en.description + el.en.location + el.en.continent)
          .toLowerCase()
          .includes(parameters.search.toLowerCase())
    );
  }
  if (parameters.sort !== "none") {
    tours = tours.filter((el) => new Date(el.startDate) - new Date() > 0);
    switch (parameters.sort) {
      case "soon": {
        tours = [...tours].sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        break;
      }
      case "late": {
        tours = [...tours].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        break;
      }
    }
  }
  if (parameters.continent !== "all") {
    tours = tours.filter((el) => el.en.continent === parameters.continent);
  }
  if (parameters.season !== "all") {
    tours = tours.filter((el) => el.en.season === parameters.season);
  }
  if (parameters.transport !== "all") {
    tours = tours.filter((el) => el.en.transport === parameters.transport);
  }
  return tours;
}

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    searchTour(state, action) {
      state.parameters.search = action.payload;
      state.tours = doAll(state.parameters);
    },
    sortTours(state, action) {
      state.parameters.sort = action.payload;
      state.tours = doAll(state.parameters);
    },
    filterContinent(state, action) {
      state.parameters.continent = action.payload;
      state.tours = doAll(state.parameters);
    },
    filterSeason(state, action) {
      state.parameters.season = action.payload;
      state.tours = doAll(state.parameters);
    },
    filterTransport(state, action) {
      state.parameters.transport = action.payload;
      state.tours = doAll(state.parameters);
    },
    clearParameters(state) {
      state.parameters = initialParameters;
      state.tours = doAll(state.parameters);
    },
  },
});

export default toursSlice.reducer;
export const {
  searchTour,
  sortTours,
  filterContinent,
  filterSeason,
  filterTransport,
  clearParameters,
} = toursSlice.actions;
