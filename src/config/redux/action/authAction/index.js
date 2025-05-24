import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/user/login", {
        email: user.email,
        password: user.password,
      });
      if (!response.data.token) {
        return thunkAPI.rejectWithValue("Invalid credentials");
      }
      localStorage.setItem("token", response.data.token);
      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/user/register", {
        email: user.email,
        password: user.password,
        name: user.name,
        username: user.username,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/get_user_and_profile", {
        params: {
          token: user.token,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export const getAllUsersProfile = createAsyncThunk(
  "user/getAllUsersProfile",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/get_all_users_profile");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);
