import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";


// do the datafetching here and then use it

export const getPosts = createAsyncThunk('getPosts', async () => {
  const posts = await appwriteService.getPosts([])
  return posts;
})

export const getPost = createAsyncThunk('getPost', async (slug) => {
  const post = await appwriteService.getPost(slug);
  return post;
})

const initialState = {
  isAllPostsLoading : false,
  allPosts: [],
  isAllPostsError : false,

  isOnePostLoading : false,
  onePost: null,
  isOnePostError : false
};

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers : (builder) => {

    // for all the datas
    builder.addCase(getPosts.pending, (state, action) => {
      state.isAllPostsLoading = true
    })

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload
      state.isAllPostsLoading = false
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isAllPostsError = true
      console.log(action.payload);
    })

    // for single data 
    builder.addCase(getPost.pending, (state, action) => {
      state.isOnePostLoading = true;
    })
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.onePost = action.payload;
      state.isOnePostLoading = false;
    })
    builder.addCase(getPost.rejected, (state, action) => {
      state.isOnePostError = true;
      console.log(action.payload);
    })
  }
});

export default postSlice.reducer;
