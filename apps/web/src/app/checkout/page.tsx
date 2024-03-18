"use client"
import isAuthUser from '@/components/isAuthUser';
import Checkout from './components/Checkout';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';

const Checkoutpage = () => {
  return (
    <div>
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
};

export default isAuthUser(Checkoutpage);
