'use client';

import { useLoginUser } from '@/hooks/formik/useLoginUser';
import Login from './components/Login';

const LoginPage = () => {
  const { formik } = useLoginUser();

  return (
    <>
      <Login formik={formik} />
    </>
  );
};

export default LoginPage;
