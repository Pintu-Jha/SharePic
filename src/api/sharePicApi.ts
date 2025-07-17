import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://sharepicbackend.onrender.com';

export const sharePicApi = createApi({
  reducerPath: 'sharePicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from state if available
      // @ts-ignore
      const token = getState().auth?.token || null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // USER ENDPOINTS
    register: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/users/register',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    getUser: builder.query<any, string>({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    // POST ENDPOINTS
    getPosts: builder.query<any[], void>({
      query: () => '/posts',
    }),
    getPost: builder.query<any, string>({
      query: (id) => `/posts/${id}`,
    }),
    createPost: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/posts',
        method: 'POST',
        body: formData,
      }),
    }),
    deletePost: builder.mutation<any, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = sharePicApi; 