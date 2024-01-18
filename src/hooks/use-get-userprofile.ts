import { asiaSportBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetUserProfile(session) {
  const {
    isLoading: userProfileLoading,
    data: userProfile,
    refetch: refetchProfile,
  } = useQuery(
    'user-profile',
    async () => {
      // Check if session is available before making the API call
      // if (session) {
      const userRole = session?.user?.role;
      const apiEndpoint =
        userRole === 'admin' ? '/api/admin/profile' : '/api/user/profile';

      const response = await asiaSportBackendUrl.post(
        apiEndpoint,
        {
          phone: session?.user?.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch user profile data!');
      }
      // } else {
      //   // Return a default or handle the case when session is not available
      //   return null;
      // }
    },
    {
      enabled: !!session,
    }
  );

  return { userProfile, userProfileLoading, refetchProfile };
}
