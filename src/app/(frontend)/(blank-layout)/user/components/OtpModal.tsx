import { routes } from '@/config/routes';
import { useVerifyPhoneMutation } from '@/features/auth/authApi';
import { TModalElementType } from '@/types';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiSpinnerLight } from 'react-icons/pi';
import { PinCode } from 'rizzui';

export default function OtpModal({ phone }: { phone: string }) {
  const { replace } = useRouter();
  const [otp, setOtp] =
    useState<SetStateAction<string | number | undefined>>('');
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpValidMsg, setOtpValidMsg] = useState('');

  const [verifyPhone, { data: responseData, isSuccess, isError }] =
    useVerifyPhoneMutation();

  useEffect(() => {
    if (isError) {
      setOtpSubmitting(false);
      toast.error('Something went wrong! Try Again');
    }

    if (isSuccess) {
      console.log(responseData?.data);

      if (!responseData?.status) {
        setOtpSubmitting(false);
        setOtpValidMsg(responseData?.message);
      } else {
        toast.success(responseData?.message);

        signIn('credentials', {
          userData: JSON.stringify(responseData?.data),
          adminLogin: false,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            setOtpSubmitting(false);
            toast.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            replace(routes.home);
            const modal = document.getElementById(
              'otpModalVerify'
            ) as TModalElementType;

            if (modal) {
              modal.close();
            }
            // toast.success('Login Successfully!');
          }
        });
      }
    }
  }, [isError, isSuccess, replace, responseData]);

  // Submit Handler
  const otpSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSubmitting(true);
    setOtpValidMsg('');

    if (typeof otp === 'string') {
      if (otp.length < 6) {
        setOtpSubmitting(false);
        setOtpValidMsg('Please, Enter Valid OTP!');
      } else {
        verifyPhone({
          phone,
          otp,
        });
      }
    } else {
      setOtpValidMsg('Please, Enter Valid OTP!');
    }
  };

  return (
    <dialog id="otpModalVerify" className="modal">
      <div className="modal-box bg-[#1C2632]">
        <h3 className="text-lg font-bold">OTP Verification!</h3>
        <div className="py-4">
          <div className="label mb-4">
            <span className="text-sm font-semibold text-white">
              We sent an OTP to your phone (+{phone}). You have 2 minutes to
              complete this verification. Thank you!
            </span>
          </div>
          <form onSubmit={otpSubmitHandler}>
            <div>
              <PinCode length={6} setValue={(input) => setOtp(input)} />
            </div>
            {otpValidMsg && (
              <p className="mt-4 px-1 text-center font-medium text-error">
                {otpValidMsg}
              </p>
            )}
            <div className="card-actions mt-10 justify-end">
              <button
                className="btn btn-primary w-full disabled:bg-[#0053d7] disabled:text-[#d1f2ff]"
                disabled={otpSubmitting}
              >
                Submit{' '}
                {otpSubmitting && (
                  <PiSpinnerLight size={20} className="animate-spin" />
                )}
              </button>
            </div>
          </form>
        </div>

        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
}
