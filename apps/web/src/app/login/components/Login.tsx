import { LoginProps } from '@/types/props.type';
import Link from 'next/link';
import React from 'react';

const Login = ({ formik }: LoginProps) => {
  return (
    <div>
      <div className="min-h-screen flex items-center">
        <div className="w-full h-full bg-white flex flex-col p-10 justify-between items-center">
          <div className="w-full flex flex-col max-w-[400px]">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-4">Sign In</h3>
              <p className="text-base mb-2">
                Welcome Back! Please enter your details.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 mb-6 w-full group mt-5">
                  <input
                    type="text"
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.usernameOrEmail}
                  />
                  <label
                    htmlFor="usernameOrEmail"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    usernameOrEmail
                  </label>
                  {formik.errors.usernameOrEmail &&
                    formik.touched.usernameOrEmail && (
                      <p className="text-sm text-red-500 mt-2">
                        {formik.errors.usernameOrEmail}
                      </p>
                    )}
                </div>
                <div className="relative z-0 mb-6 w-full group mt-5">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
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
    </div>
  );
};

export default Login;
