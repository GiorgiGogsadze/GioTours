import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: JSON.parse(localStorage.getItem("_#_users") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("_#_currentUser") || "{}"),
  error: "",
  success: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser(state, action) {
      if (action.payload.password1 !== action.payload.password2) {
        state.error = "passwords doesn't match";
        return;
      }
      const existEmail = state.allUsers.find(
        (el) => el.email === action.payload.email
      );
      if (existEmail) {
        state.error = "this email is already used";
        return;
      }
      const existName = state.allUsers.find(
        (el) => el.userName === action.payload.userName
      );
      if (existName) {
        state.error = "this username is already exists";
        return;
      }
      const newUser = {
        email: action.payload.email,
        userName: action.payload.userName,
        password: action.payload.password1,
      };
      state.allUsers.push(newUser);
      localStorage.setItem("_#_users", JSON.stringify(state.allUsers));
      state.currentUser = newUser;
      localStorage.setItem("_#_currentUser", JSON.stringify(newUser.userName));
      state.success = "Account has created";
    },
    logout(state) {
      state.currentUser = {};
      localStorage.setItem("_#_currentUser", "{}");
    },
    login(state, action) {
      const exist = state.allUsers.find(
        (el) =>
          el.userName === action.payload.name ||
          el.email === action.payload.name
      );
      if (!exist || exist.password !== action.payload.password) {
        state.error = "incorrect email / username or password";
        return;
      }
      state.currentUser = exist;
      localStorage.setItem("_#_currentUser", JSON.stringify(exist));
      state.success = `Welcome ${exist.userName}`;
    },
    clearAlert(state) {
      state.error = "";
      state.success = "";
    },
  },
});

export default usersSlice.reducer;
export const { createUser, logout, login, clearAlert } = usersSlice.actions;
