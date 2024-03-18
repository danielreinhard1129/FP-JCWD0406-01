'use client';
import { Header } from '@/components/Header';
import Cart from './components/Cart';
import isAuthUser from '@/components/isAuthUser';
import Footer from '@/components/Footer';

const Cartpage = () => {
  return (
    <div>
      <Header />
      <div className="container max-w-7xl mx-auto">
        <Cart />
      </div>
      <Footer />
    </div>
  );
};

export default isAuthUser(Cartpage);
