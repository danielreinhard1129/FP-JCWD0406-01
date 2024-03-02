import useGetStores from '@/app/hooks/stores/useGetStores';
import { Button, Spinner } from 'flowbite-react';
import React from 'react';
import InputFields from '../../components/InputFields';

const FormStoreAdmin = ({ formik, setOpenModal, method }: any) => {
  const { data, loading } = useGetStores();
  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col items-center text-sm"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-[80%]">
        <InputFields label="Name" name="name" id="name" formik={formik} />
      </div>
      <div className="w-[80%]">
        <InputFields
          label="Email"
          name="email"
          id="email"
          type="email"
          formik={formik}
        />
      </div>
      <div className="mt-3 w-[80%]">
        <label htmlFor="stores">Select Store Branch</label> <br />
        <select
          name="storeId"
          id="stores"
          className="w-full rounded-sm mt-2"
          value={formik.values.storeId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="0">select</option>
          {data?.map((value) => {
            return (
              <option value={`${value.id}`} key={value.id}>
                {value.name}
              </option>
            );
          })}
        </select>
        {formik.touched.storeId && formik.errors.storeId && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.storeId}</p>
        )}
      </div>
      {method !== 'put' && (
        <div className="w-[80%]">
          <InputFields
            label="Password"
            name="password"
            id="password"
            type="password"
            formik={formik}
          />
        </div>
      )}
      <div className="flex justify-center gap-4 mt-4">
        <Button color="success" type="submit">
          Submit
        </Button>
        <Button color="light" onClick={() => setOpenModal(false)}>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default FormStoreAdmin;
