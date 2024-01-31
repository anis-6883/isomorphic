'use client';

// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Form } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Password } from '@/components/ui/password';
import { useMedia } from '@/hooks/use-media';
import { Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { PiSpinnerLight } from 'react-icons/pi';
import * as Yup from 'yup';

// const initialValues: LoginSchema = {
//   email: 'admin@admin.com',
//   password: 'admin',
//   rememberMe: true,
// };

export default function SignInForm() {
  const { replace } = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [loginFormSubmitted, setLoginFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email!').required('Required'),
    password: Yup.string().required('Required'),
  });

  // Form Submit Handler
  const onSubmit = async (values: any) => {
    setLoginFormSubmitted(true);
    values.adminLogin = true;

    signIn('credentials', {
      ...values,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setLoginFormSubmitted(false);
        toast.error(callback?.error);
      }
      if (callback?.ok && !callback?.error) {
        replace('/super-admin/dashboard');
        toast.success('Admin Login Successfully!');
      }
    });
  };

  // const onSubmit: SubmitHandler<LoginSchema> = (data) => {
  //   console.log(data);
  // };

  return (
    <>
      {/* <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-1">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword4}
                className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form> */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form>
              <div className="form-control mt-5 w-full">
                <label className="label">
                  <span className="label-text font-bold">
                    Email<span className="mr-2 text-red-600">*</span>
                    {/* <ErrorMessage
                      name="email"
                      component={({ children }) => (
                        <span className="text-sm text-red-600">
                          ({children})
                        </span>
                      )}
                    /> */}
                  </span>
                </label>
                <Field name="email">
                  {({ field, meta }: { field: any; meta: any }) => {
                    return (
                      <input
                        type="email"
                        className={`${
                          meta.touched && meta.error
                            ? 'input-error'
                            : 'input-neutral'
                        } input input-bordered w-full`}
                        {...field}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className="form-control mt-3 w-full">
                <label className="label">
                  <span className="label-text font-bold">
                    Password<span className="mr-2 text-red-600">*</span>
                    {/* <ErrorMessage
                      name="password"
                      component={({ children }) => (
                        <span className="text-sm text-red-600">
                          ({children})
                        </span>
                      )}
                    /> */}
                  </span>
                </label>
                <Field name="password">
                  {({ field, meta }: { field: any; meta: any }) => {
                    return (
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`${
                            meta.touched && meta.error
                              ? 'input-error'
                              : 'input-neutral'
                          } input input-bordered w-full`}
                          {...field}
                        />
                        {showPassword ? (
                          <BsEye
                            onClick={() => setShowPassword(false)}
                            className="absolute right-3 top-3 cursor-pointer text-2xl"
                          />
                        ) : (
                          <BsEyeSlash
                            onClick={() => setShowPassword(true)}
                            className="absolute right-3 top-3 cursor-pointer text-2xl"
                          />
                        )}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-white disabled:bg-[#1742b6] disabled:text-[#d9ebff]"
                  disabled={loginFormSubmitted}
                >
                  {loginFormSubmitted ? 'Requesting...' : 'Login'}
                  {loginFormSubmitted && (
                    <PiSpinnerLight className="animate-spin" />
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
