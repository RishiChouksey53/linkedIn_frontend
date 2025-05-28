import { all } from "axios";

const { createSlice } = require("@reduxjs/toolkit");
const {
  getAllPosts,
  deletePost,
  incrementLikes,
  getCommentsByPost,
  commentPost,
  deleteComment,
} = require("../../action/postAction");

const initialState = {
  posts: [],
  isError: false,
  postFetched: false,
  isLoading: false,
  isLoggedIn: false,
  messagge: "",
  comments: [],
  postId: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.postFetched = false;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postFetched = true;
        state.posts = action.payload.posts.reverse();
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.postFetched = false;
        state.isError = true;
        state.messagge = action?.payload?.message || "Post fetching failed";
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messagge = action?.payload?.message || "Post deletion failed";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.messagge = action?.payload?.message || "Post deletion failed";
      })
      .addCase(incrementLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messagge = action?.payload?.message || "you Liked a Post";
      })
      .addCase(incrementLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.messagge = action?.payload?.message || "Post Like failed";
      })
      .addCase(getCommentsByPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsByPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload.comments;
        state.postId = action.payload.postId;
      })
      .addCase(getCommentsByPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.messagge = action?.payload?.message || "Comments fetching failed";
      })
      .addCase(commentPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messagge = action?.payload?.message || "Commented on a Post";
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.messagge = action?.payload?.message || "Commenting failed";
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messagge = action?.payload?.message || "Comment deleted";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.messagge = action?.payload?.message || "Comment deletion failed";
      });
  },
});

export default postSlice.reducer;
export const { reset, resetPostId } = postSlice.actions;
