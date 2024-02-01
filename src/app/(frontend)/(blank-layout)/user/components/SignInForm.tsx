'use client';

import { routes } from '@/config/routes';
import {
  useLoginWithPhoneMutation,
  useUserRegisterMutation,
} from '@/features/auth/authApi';
import { userLoggedIn } from '@/features/auth/authSlice';
import { useGetAllowedStatesQuery } from '@/features/front-end/settings/settingsApi';
import { TModalElementType } from '@/types';
import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { PiSpinnerLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { Password } from 'rizzui';
import OtpModal from './OtpModal';
import { PhoneNumber } from './PhoneNumber';

export default function SignInForm({ signUp }: { signUp: boolean }) {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState<any>('');
  const [dialCode, setDialCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [phoneValidMsg, setPhoneValidMsg] = useState('');
  const [passwordValidMsg, setPasswordValidMsg] = useState('');

  const [
    loginWithPhone,
    { data: loginResponse, isSuccess: loginSuccess, isError: loginError },
  ] = useLoginWithPhoneMutation();

  const [
    userRegister,
    {
      data: registerResponse,
      isSuccess: registerSuccess,
      isError: registerError,
    },
  ] = useUserRegisterMutation();

  const { data: allowedCountries, isLoading } =
    useGetAllowedStatesQuery(undefined);

  // Handle Register Response
  useEffect(() => {
    if (registerError) {
      setSubmitting(false);
      toast.error('Something went wrong! Try Again');
    }

    if (registerSuccess) {
      setSubmitting(false);

      if (registerResponse?.status) {
        toast.success(registerResponse?.message);
        const modal = document.getElementById(
          'otpModalVerify'
        ) as TModalElementType;

        if (modal) {
          modal.showModal();
        }
      } else {
        toast.error(registerResponse?.message);
      }
    }
  }, [registerError, registerSuccess, registerResponse]);

  // Handle Login Response
  useEffect(() => {
    if (loginError) {
      setSubmitting(false);
      toast.error('Something went wrong! Try Again');
    }

    if (loginSuccess) {
      if (loginResponse?.status) {
        dispatch(
          userLoggedIn({
            accessToken: loginResponse?.data?.accessToken,
            user: loginResponse?.data,
          })
        );

        signIn('credentials', {
          userData: JSON.stringify(loginResponse?.data),
          adminLogin: false,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            setSubmitting(false);
            toast.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success(loginResponse?.message);
            replace(routes.home);
          }
        });
      } else {
        setSubmitting(false);
        toast.error(loginResponse?.message);
      }
    }
  }, [loginError, loginSuccess, loginResponse, replace, dispatch]);

  // Submit Handler
  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setPhoneValidMsg('');
    setPasswordValidMsg('');

    if (
      !phone ||
      !country ||
      phone.length <= dialCode.length ||
      !isValidPhoneNumber(phone.replace(dialCode, ''), countryCode)
    ) {
      setSubmitting(false);
      setPhoneValidMsg('Valid phone number is required!');
      return;
    }

    if (!password) {
      setSubmitting(false);
      setPasswordValidMsg('Password is required!');
      return;
    }

    if (signUp && password.length < 8) {
      setSubmitting(false);
      setPasswordValidMsg('Password length at least 8 characters!');
      return;
    }

    if (signUp) {
      userRegister({
        phone,
        password,
        country,
        provider: 'phone',
      });
    } else {
      loginWithPhone({
        phone,
        password,
      });
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#061626] text-white">
      <div className="card w-[500px] bg-[#1C2632] shadow-xl">
        <div className="card-body">
          <h2 className="mb-5 text-center text-xl font-semibold">
            {signUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <form onSubmit={signInHandler}>
            {isLoading ? (
              <div>
                <div className="mb-2 h-6 w-full max-w-36 animate-pulse rounded-md bg-[#061626]"></div>
                <div className="h-12 w-full animate-pulse rounded bg-[#061626]"></div>
              </div>
            ) : (
              <div>
                <PhoneNumber
                  label="Phone Number"
                  size="lg"
                  country={allowedCountries?.data[0]}
                  onlyCountries={allowedCountries?.data}
                  dropdownClassName="text-black"
                  requiredStar={true}
                  labelClassName="text-base"
                  color="primary"
                  variant="outline"
                  onChange={(
                    phone,
                    country: {
                      name: string;
                      countryCode: CountryCode;
                      dialCode: string;
                    }
                  ) => {
                    setPhoneValidMsg('');
                    setPhone(phone);
                    setCountry(country?.name);
                    setCountryCode(country?.countryCode.toUpperCase());
                    setDialCode(country?.dialCode);
                  }}
                  value={phone}
                />
                {phoneValidMsg && (
                  <p className="mt-1 select-none px-1 font-medium text-error">
                    {phoneValidMsg}
                  </p>
                )}
              </div>
            )}

            <div className="mt-3">
              <Password
                size="lg"
                label={
                  <p>
                    Password<span className="font-bold text-red-600"> *</span>
                  </p>
                }
                variant="outline"
                color="primary"
                labelClassName="text-base"
                onChange={(e) => {
                  setPasswordValidMsg('');
                  setPassword(e.target.value);
                }}
              />
              {passwordValidMsg && (
                <p className="mt-1 select-none px-1 font-medium text-error">
                  {passwordValidMsg}
                </p>
              )}
            </div>

            <div className="card-actions mt-5 justify-end">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={submitting}
              >
                {signUp ? 'Sign Up' : 'Sign In'}{' '}
                {submitting && (
                  <PiSpinnerLight className="animate-spin text-base" />
                )}
              </button>
            </div>
          </form>

          <div className="divider select-none">OR</div>
          <div className="card-actions justify-end">
            <Link
              href={signUp ? routes.signIn : routes.signUp}
              className="btn btn-outline btn-primary w-full"
            >
              {signUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </div>
          <div className="mt-5 flex select-none items-center justify-center">
            <Link
              href="/"
              className="flex items-center transition-all duration-150 ease-in hover:text-primary"
            >
              <HiOutlineArrowSmLeft className="mr-3 text-xl" /> Go to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Otp Modal */}
      <OtpModal phone={phone} />
    </section>
  );
}
