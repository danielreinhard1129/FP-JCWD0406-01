'use client';

import { useLoginAdmin } from '@/hooks/formik/useLoginAdmin';
import LoginAdmin from './components/LoginAdmin';

const LoginPage = () => {
  const { formik } = useLoginAdmin();

  return (
    <>
      <LoginAdmin formik={formik} />
    </>
  );
};

export default LoginPage;
