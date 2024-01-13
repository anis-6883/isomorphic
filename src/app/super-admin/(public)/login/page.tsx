import AuthWrapperFour from '@/app/signin/auth-wrapper-four';
import { metaObject } from '@/config/site.config';
import SignInForm from './sign-in-form';

export const metadata = {
  ...metaObject('User Sign In'),
};

export default function SignInPage() {
  return (
    <AuthWrapperFour
      title={<>Welcome Back! Admin Sign in with your credentials.</>}
      isSignIn
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
