'use client';

import { useGetAllowedStatesQuery } from '@/features/front-end/settings/settingsApi';
import Link from 'next/link';
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function SignInForm() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data: allowedCountries, isLoading } =
    useGetAllowedStatesQuery(undefined);

  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('phone: ', phone);
    console.log('country: ', country);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#061626] text-white">
      <div className="card w-[500px] bg-[#1C2632] shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-semibold">Sign In</h2>
          <form onSubmit={signInHandler}>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-sm font-semibold text-white">
                  Phone Number <span className="text-error">*</span>
                </span>
              </div>
            </label>
            {isLoading ? (
              <div className="h-12 w-full animate-pulse rounded bg-[#061626]"></div>
            ) : (
              <PhoneInput
                dropdownClass="text-black"
                inputClass="!w-full !h-[50px] !text-black !rounded-md"
                buttonClass="!rounded-l-md !border-none"
                value={phone}
                country={allowedCountries?.data[0]}
                onChange={(phone, country) => {
                  setPhone(phone);
                  setCountry(country?.name);
                }}
                onlyCountries={allowedCountries?.data}
                // inputClass="block peer !w-full focus:outline-none transition duration-200 disabled:!bg-gray-100 disabled:!text-gray-500 disabled:placeholder:!text-gray-500 disabled:!cursor-not-allowed disabled:!border-gray-200 !h-[50px]"
                // enableSearch
                // masks={{ bd: '....-......' }}
              />
            )}

            <div id="recaptcha-container" className="mt-4"></div>

            <div className="card-actions mt-5 justify-end">
              <button
                type="submit"
                className="btn btn-primary w-full disabled:bg-[#0053d7] disabled:text-[#d1f2ff]"
                disabled={submitting}
              >
                Sign In{' '}
                {submitting && <FiCheckCircle className="animate-spin" />}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>
          <div className="card-actions justify-end">
            <Link href="/signup" className="btn btn-outline btn-primary w-full">
              Sign Up
            </Link>
          </div>
          <div className="mt-5 flex items-center justify-center">
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
      {/* <OtpModal country={country} phone={phone} setLoading={setLoading} /> */}
    </section>
  );
}
