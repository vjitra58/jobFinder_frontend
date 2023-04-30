import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer.js";
import { jobsReducer } from "./reducers/jobsReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobsReducer,
  },
});

export default store;

export const server = "https://jobfinder-bacend-h91rpuh15-vjitra58.vercel.app/api/v1";
