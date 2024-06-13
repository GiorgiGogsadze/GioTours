import { createSlice } from "@reduxjs/toolkit";
import toursData from "./tours.data";

const initialState = {
  tours: toursData,
};

let parameters = {
  search: "",
  continent: "all",
  season: "all",
  transport: "all",
  sort: "none",
};

function doAll() {
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
      parameters.search = action.payload;
      state.tours = doAll();
    },
    sortTours(state, action) {
      parameters.sort = action.payload;
      state.tours = doAll();
    },
    filterContinent(state, action) {
      parameters.continent = action.payload;
      state.tours = doAll();
    },
    filterSeason(state, action) {
      parameters.season = action.payload;
      state.tours = doAll();
    },
    filterTransport(state, action) {
      parameters.transport = action.payload;
      state.tours = doAll();
    },
    fillTours(state) {
      state.tours = toursData;
    },
  },
});

export default toursSlice.reducer;
export const {
  fillTours,
  searchTour,
  sortTours,
  filterContinent,
  filterSeason,
  filterTransport,
} = toursSlice.actions;
