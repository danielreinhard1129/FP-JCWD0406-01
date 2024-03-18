import { LoginProps } from '@/types/props.type';
import Link from 'next/link';
import React from 'react';

const LoginAdmin = ({ formik }: LoginProps) => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full h-full bg-white flex flex-col p-10 justify-between items-center">
        <div className="w-full flex flex-col max-w-[400px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-4 text-center">Sign In</h3>
          </div>
          <div className="w-full flex flex-col">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-6 w-full mt-5">
                <label htmlFor="usernameOrEmail">UsernameOrEmail</label>
                <input
                  type="text"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  placeholder=" "
                  className="mt-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.usernameOrEmail}
                />
                {formik.errors.usernameOrEmail &&
                  formik.touched.usernameOrEmail && (
                    <p className="text-sm text-red-500 mt-2">
                      {formik.errors.usernameOrEmail}
                    </p>
                  )}
              </div>
              <div className="flex flex-col mb-6 w-full mt-5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" "
                  className="mt-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-sm text-red-500 mt-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Dont have a account?{' '}
            <Link href="#">
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Sign up for free
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
