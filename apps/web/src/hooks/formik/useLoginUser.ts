import { axiosInstance } from '@/libs/axios';
import { loginAction } from '@/libs/features/userSlice';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useAppDispatch } from '@/libs/hooks';
import { useRouter } from 'next/navigation';
YupPassword(yup);

export const useLoginUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validationSchema = yup.object().shape({
    usernameOrEmail: yup.string().required('Username or Email cannot be empty'),
    password: yup.string().required('Password cannot be empty').min(6),
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const userLogin = {
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
      };

      try {
        const response = await axiosInstance.post(`/users/login`, userLogin);

        localStorage.setItem('token_auth', response.data.token);
        dispatch(loginAction(response.data.data));

        toast.success('Login Success');
        router.push('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error?.response?.data?.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return { formik };
};
