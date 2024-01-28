import { metaObject } from '@/config/site.config';
import SignInForm from '../components/SignInForm';

export const metadata = {
  ...metaObject('User Sign In'),
};

export default function Page() {
  return <SignInForm />;
}
