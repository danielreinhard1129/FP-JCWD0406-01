import { Modal } from 'flowbite-react';
import React from 'react';
import FormProduct from './FormProduct';
import useFormikProductForm from '@/app/hooks/formiks/useFormikProductForm';

const ModalEditProduct = ({ openModal, setOpenModal, product, refreshData }: any) => {
  const formik = useFormikProductForm(product, "/products/update-product/" + product.id ,refreshData, "put",setOpenModal);
  return (
    <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
      <Modal.Body>
        <div className="space-y-6 mt-5">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Product
          </h3>
          <FormProduct setOpenModal={setOpenModal} formik={formik} refreshData={refreshData}/>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditProduct;
