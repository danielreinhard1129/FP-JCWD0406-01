// 'use client';
// import { Button } from 'flowbite-react';
// import { Roboto } from 'next/font/google';
// import React, { useState } from 'react';
// import ModalInput from '../../components/ModalInput';
// import FormStoreAdmin from './FormStoreAdmin';
// import useGetStoreAdmins from '@/app/hooks/storeAdmin/useGetStoreAdmins';
// import useFormikStoreAdmin from '@/app/hooks/formiks/useFormikStoreAdmin';
// import TableStoreAdmin from './TableStoreAdmin';

// const roboto = Roboto({
//   weight: '900',
//   subsets: ['latin'],
// });

// const ManageStoreAdminPage = () => {
//   const [openAdd, setOpenAdd] = useState(false);
//   const{data,loading, refreshData} = useGetStoreAdmins();
//   // const formik = useFormikStoreAdmin("","/store-admins/",refreshData,setOpenAdd)
//   return (
//     <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
//       <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
//         <h1 className={`${roboto.className} text-3xl`}>Manage Store Admin</h1>
//         <Button size={'sm'} color="success" onClick={() => setOpenAdd(true)}>
//           Add Store Admin
//         </Button>
//       </div>

//       {/* {data && <TableStoreAdmin data={data} loading={loading} formik={formik} refreshData={refreshData}/>} */}

//       <ModalInput
//         openModal={openAdd}
//         setOpenModal={setOpenAdd}
//         refreshData={refreshData}
//         Form={FormStoreAdmin}
//         // formik={formik}
//         judul="Add Store Admin"
//       />
//     </div>
//   );
// };

// export default ManageStoreAdminPage;
