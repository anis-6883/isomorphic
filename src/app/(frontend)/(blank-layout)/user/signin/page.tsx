import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { metaObject } from '@/config/site.config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignInForm from '../components/SignInForm';

export const metadata = {
  ...metaObject('User Sign In'),
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }

  return <SignInForm signUp={false} />;
}
