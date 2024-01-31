import { env } from '@/env.mjs';
import getAccessToken from '@/utils/axios/getAccessToken';
import { asiaSportBackendUrl } from '@/utils/axios/getAxios';
import getRandomString from '@/utils/get-random-string';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { pagesOptions } from './pages-options';

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // Expire in 30 Days
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) {
      if (account?.provider === 'credentials') {
        if (user) {
          return {
            ...token,
            ...user,
          };
        }
      }

      // Handle Social Auth
      if (account?.provider === 'google' || account?.provider === 'apple') {
        const values = {
          name: user?.name,
          email: user?.email,
          password: getRandomString(10),
          image: user?.image,
          provider: account?.provider,
        };
        const { data } = await asiaSportBackendUrl.post(
          '/api/user/register',
          values
        );
        const userData = data?.data;

        if (userData) {
          return {
            ...token,
            ...userData,
          };
        }
      }

      // Get Access Token
      if (new Date().getTime() < token?.expiresIn) return token;

      const role = token?.role === 'user' ? 'user' : 'admin';
      return await getAccessToken(token, role);
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        // const cookies = cookie.parse(req.headers.cookie);
        // Admin Login
        if (credentials?.adminLogin === 'true') {
          try {
            const { data } = await asiaSportBackendUrl.post(
              '/api/admin/login',
              {
                email: credentials?.email,
                password: credentials?.password,
              }
            );

            if (data?.status === false) {
              throw new Error(data?.message);
            } else {
              const user = data?.data;
              return user; // return the user's data
            }
          } catch (err: any) {
            console.log(err.message);
            throw new Error(err.message);
          }
        } else {
          // User Otp Verify & Sign In
          const user = JSON.parse(credentials.userData);
          return user; // userData come from otp verify

          // if (credentials?.signUp === 'true') {
          //   try {
          //     const { data } = await asiaSportBackendUrl.post(
          //       '/api/user/verify-email',
          //       { otp: credentials?.otp },
          //       {
          //         headers: {
          //           token: cookies?._temp,
          //         },
          //       }
          //     );

          //     if (data.status === false) {
          //       throw new Error(data?.message);
          //     }

          //     const user = data?.data;

          //     return user; // return the user's data
          //   } catch (err) {
          //     throw new Error(err.message);
          //   }
          // } else {
          //   try {
          //     // User Sign In

          //     const { data } = await asiaSportBackendUrl.post(
          //       '/api/user/login',
          //       {
          //         email: credentials?.email,
          //         password: credentials?.password,
          //         provider: 'email',
          //       }
          //     );

          //     if (data?.status === false) {
          //       throw new Error(data?.message);
          //     } else {
          //       const user = data?.data;
          //       return user; // return the user's data
          //     }
          //   } catch (err) {
          //     throw new Error(err.message);
          //   }
          // }

          // After verified otp by firebase
          // try {
          //   const { data } = await asiaSportBackendUrl.post(
          //     '/api/user/login-with-phone',
          //     { phone: credentials?.phone, country: credentials?.country }
          //   );

          //   if (data.status === false) {
          //     throw new Error(data?.message);
          //   }

          //   const user = data?.data;

          //   return user; // return the user's data
          // } catch (err) {
          //   console.log(err);
          //   throw new Error(err.message);
          // }
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
