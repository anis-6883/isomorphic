import { apiSlice } from '@/features/api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/register`,
          method: 'POST',
          body: data,
        };
      },
    }),
    loginWithPhone: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/login`,
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
  useGetProfileQuery,
  useVerifyPhoneMutation,
  useUserRegisterMutation,
  useLoginWithPhoneMutation,
} = authApi;
