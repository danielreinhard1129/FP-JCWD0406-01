import * as Yup from 'yup';

import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFormikStoreAdmin = (
  method: string,
  router: string,
  storeAdmin: any,
  refreshData: CallableFunction,
  setOpenModal: CallableFunction,
) => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    email: Yup.string().required('email cannot be empty').email(),
    password: method === 'put'
    ? Yup.string()
    : Yup.string().required('Password cannot be empty'),
    storeId: Yup.string().required('Store cannot be empty'),
  });

  const formik = useFormik({
    initialValues: {
      name: storeAdmin.name,
      email: storeAdmin.email || '',
      password: storeAdmin.password || '',
      storeId: storeAdmin.storeId || '0',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        
        method === 'put'
          ? await axios.patch(
              process.env.NEXT_PUBLIC_BASE_API_URL + router,
              {
                name: values.name,
                email: values.email,
                password: values.password,
                storeId: values.storeId,
              }
            )
          : await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + router, {
              name: values.name,
              email: values.email,
              password: values.password,
              storeId: values.storeId,
            });

        toast.success('Successfully toasted!', { duration: 1000 });
        setOpenModal(false);
        refreshData();
        resetForm();
      } catch (error: any) {
        console.log(error);

        toast.error(error.response.data.message);
      }
    },
  });

  return formik;
};

export default useFormikStoreAdmin;
