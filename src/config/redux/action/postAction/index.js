const { clientServer } = require("@/config");
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkApi) => {
    try {
      const response = await clientServer.get("/post/get_all_posts");
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (userData, thunkApi) => {
    const { file, body, token } = userData;
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("body", body);
      formData.append("media", file);

      const response = await clientServer.post("/post/create_post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (userData, thunkApi) => {
    const { postId, token } = userData;
    try {
      const response = await clientServer.delete("/post/delete_post", {
        data: {
          token,
          postId,
        },
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const incrementLikes = createAsyncThunk(
  "post/incrementLike",
  async (userData, thunkApi) => {
    const { postId } = userData;
    try {
      const response = await clientServer.post("/post/increment_likes", {
        postId: postId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getCommentsByPost = createAsyncThunk(
  "post/getCommentsByPost",
  async (userData, thunkApi) => {
    const { postId } = userData;
    try {
      const response = await clientServer.get("/post/get_comments_by_post", {
        params: { postId: postId },
      });
      return thunkApi.fulfillWithValue({
        comments: response.data.data,
        postId,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async (userData, thunkApi) => {
    const { postId, body, token } = userData;
    try {
      const response = await clientServer.post("/post/comment_post", {
        postId,
        body,
        token,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (userData, thunkApi) => {
    const { commentId, token } = userData;
    try {
      const response = await clientServer.delete("/post/delete_comment", {
        data: {
          token,
          commentId,
        },
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const handleLikePost = createAsyncThunk(
  "post/handleLikePost",
  async (userData, thunkApi) => {
    const { postId, userId } = userData;
    try {
      const response = await clientServer.post("/post/handle_like_post", {
        postId,
        userId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const allLikedPost = createAsyncThunk(
  "post/allLikedPost",
  async (userData, thunkApi) => {
    const { userId } = userData;
    try {
      const response = await clientServer.post("/post/all_liked_post", {
        userId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
