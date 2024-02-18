import React from 'react';
import SidebarProducts from './SidebarProducts';
import ListProducts from './ListProducts';

const ProductsPage = ({ categoryId }: any) => {
  return (
    <div className="flex bg-[url('/background.png')] bg-no-repeat bg-cover ">
      <SidebarProducts />
      <ListProducts />
    </div>
  );
};

export default ProductsPage;
