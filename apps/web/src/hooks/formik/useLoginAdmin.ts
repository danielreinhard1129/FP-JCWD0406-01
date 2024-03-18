import { axiosInstance } from '@/libs/axios';
import { loginActionAdmin } from '@/libs/features/adminSlice';
import { useAppDispatch } from '@/libs/hooks';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const useLoginAdmin = () => {
  const validationSchema = yup.object().shape({
    usernameOrEmail: yup.string().required('Username or Email cannot be empty'),
    password: yup.string().required('Password cannot be empty').min(6),
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const adminLogin = {
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
      };

      try {
        const response = await axiosInstance.post(`/admins/login`, adminLogin);
        localStorage.setItem('token_auth_admin', response.data.token);

        dispatch(loginActionAdmin(response.data.data));

        toast.success('Login Success');
        router.push('/admin/manage-order');
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
