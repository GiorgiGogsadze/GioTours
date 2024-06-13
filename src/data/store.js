import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import langReducer from "./langSlice";
import toursReducer from "./toursSlice";

const store = configureStore({
  reducer: {
    tours: toursReducer,
    users: usersReducer,
    lang: langReducer,
  },
});

export default store;
