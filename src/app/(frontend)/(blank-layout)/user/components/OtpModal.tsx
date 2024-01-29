import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { PiSpinnerLight } from 'react-icons/pi';
import { PinCode } from 'rizzui';

export default function OtpModal({
  phone,
  country,
}: {
  phone: string;
  country: string;
}) {
  const { replace } = useRouter();
  const [otp, setOtp] =
    useState<SetStateAction<string | number | undefined>>('');
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpValidMsg, setOtpValidMsg] = useState('');

  return (
    <dialog id="otpModalVerify" className="modal">
      <div className="modal-box bg-[#1C2632]">
        <h3 className="text-lg font-bold">OTP Verification!</h3>
        <div className="py-4">
          <div className="label mb-4">
            <span className="text-sm font-semibold text-white">
              Enter valid OTP Code within 2 minutes, sent to +{phone}!
            </span>
          </div>
          <form>
            <div>
              <PinCode length={6} setValue={(input) => setOtp(input)} />
            </div>
            {/* <p className="mt-4 px-1 text-error font-medium">{otpValidMsg}</p> */}
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
