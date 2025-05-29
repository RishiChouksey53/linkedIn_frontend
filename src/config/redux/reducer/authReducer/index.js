import { createSlice } from "@reduxjs/toolkit";
import {
  getAboutUser,
  getAllUsersProfile,
  getConnectionRequestsReceived,
  getConnectionRequestsSend,
  loginUser,
  registerUser,
} from "../../action/authAction";

const initialState = {
  user: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: false,
  message: "",
  profileFetced: false,
  connections: [],
  connectionRequest: [],
  isTokenThere: false,
  all_profiles: [],
  all_profiles_fetched: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage: (state) => {
      state.message = "";
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.isLoading = true), (state.message = "Knocking the door...");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isLoggedIn = true),
          (state.isSuccess = true),
          (state.message = action?.payload?.message || "login succeffully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isLoggedIn = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action?.payload?.message || "login failed");
      })
      .addCase(registerUser.pending, (state) => {
        (state.isLoading = true), (state.message = "Registering...");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message =
            action?.payload?.message ||
            "Registering succefull, Please login in");
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action?.payload?.message || "Registering failed");
      })
      .addCase(getAboutUser.pending, (state) => {
        (state.isLoading = true), (state.message = "Fetching user...");
      })
      .addCase(getAboutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.profileFetced = true),
          (state.user = action.payload.userProfile);
      })
      .addCase(getAboutUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action?.payload?.message || "Fetching user failed");
      })
      .addCase(getAllUsersProfile.pending, (state) => {
        (state.isLoading = true), (state.message = "Fetching users...");
      })
      .addCase(getAllUsersProfile.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.all_profiles_fetched = true),
          (state.all_profiles = action.payload.data);
      })
      .addCase(getAllUsersProfile.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action?.payload?.message || "Fetching users failed");
      })
      //whome i have send me -> others
      .addCase(getConnectionRequestsSend.fulfilled, (state, action) => {
        state.connections = action.payload;
      })
      .addCase(getConnectionRequestsSend.rejected, (state, action) => {
        state.message = action?.payload || "No Connection Requests";
      })
      .addCase(getConnectionRequestsReceived.fulfilled, (state, action) => {
        state.connectionRequest = action.payload;
      })
      .addCase(getConnectionRequestsReceived.rejected, (state, action) => {
        state.message = action?.payload || "No Connection Requests";
      });
  },
});

export const {
  reset,
  handleLoginUser,
  setTokenIsNotThere,
  setTokenIsThere,
  emptyMessage,
} = authSlice.actions;
export default authSlice.reducer;
