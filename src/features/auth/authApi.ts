import { apiSlice } from '@/features/api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginWithPhone: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/login-with-phone`,
          method: 'POST',
          body: data,
        };
      },
    }),
    verifyPhone: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/verify-phone`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getProfile: builder.query({
      query: () => `/api/user/profile`,
    }),
  }),
});

export const {
  useLoginWithPhoneMutation,
  useVerifyPhoneMutation,
  useGetProfileQuery,
} = authApi;
