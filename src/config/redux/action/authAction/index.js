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

export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async (userData, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/user/sent_connection_request",
        {
          token: userData.token,
          connectionId: userData.connectionId,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export const getConnectionRequestsSend = createAsyncThunk(
  "user/getConnectionRequestsSend",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get(
        "/user/get_connection_requests_send",
        {
          params: {
            token: user.token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export const getConnectionRequestsReceived = createAsyncThunk(
  "user/getConnectionRequestsReceived",
  async (user, thunkAPI) => {
    try {
      console.log(user.token);
      const response = await clientServer.get(
        "/user/get_connection_requests_received",
        {
          params: {
            token: user.token,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export const acceptConnectionRequest = createAsyncThunk(
  "user/acceptConnectionRequest",
  async (requestData, thunkAPI) => {

    console.log("Request Data: ", requestData);
    try {
      const response = await clientServer.post(
        "/user/accept_connection_request",
        {
          token: requestData.token,
          connectionId: requestData.connectionId,
          action_type: requestData.action,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);
