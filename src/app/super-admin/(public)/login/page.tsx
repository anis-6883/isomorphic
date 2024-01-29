import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AuthWrapperFour from '@/app/signin/auth-wrapper-four';
import { metaObject } from '@/config/site.config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignInForm from './sign-in-form';

export const metadata = {
  ...metaObject('Admin Sign In'),
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session.user.role === 'admin') {
      redirect('/super-admin/dashboard');
    } else {
      redirect('/');
    }
  }

  return (
    <AuthWrapperFour
      title={<>Welcome Back! Admin Sign in with your credentials.</>}
      isSignIn
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
