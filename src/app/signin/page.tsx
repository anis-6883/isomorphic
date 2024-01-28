import AuthWrapperFour from '@/app/signin/auth-wrapper-four';
import { metaObject } from '@/config/site.config';
import SignInForm from './components/SignInForm';

export const metadata = {
  ...metaObject('User Sign In'),
};

export default function SignInPage() {
  return (
    <AuthWrapperFour
      title={<>Welcome Back! Sign in with your credentials.</>}
      isSignIn
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
