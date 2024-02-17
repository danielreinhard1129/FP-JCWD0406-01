import { Modal } from 'flowbite-react';
import React from 'react';
import FormProduct from './FormProduct';
import useFormikProductForm from '@/app/hooks/formiks/useFormikProductForm';

const ModalAddProduct = ({ openModal, setOpenModal, product, refreshData, judul }: any) => {
  const formik = useFormikProductForm(product, "/products/create-product/" ,refreshData, "add",setOpenModal);
  return (
    <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
      <Modal.Body>
        <div className="space-y-6 mt-5">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {judul}
          </h3>
          <FormProduct setOpenModal={setOpenModal} formik={formik} refreshData={refreshData}/>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddProduct;
