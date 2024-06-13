import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  langs: [
    { value: "en", flag: "🇬🇧" },
    { value: "ka", flag: "🇬🇪" },
  ],
  currentLang: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang(state, action) {
      state.currentLang = action.payload;
    },
  },
});

export default langSlice.reducer;
export const { changeLang } = langSlice.actions;
