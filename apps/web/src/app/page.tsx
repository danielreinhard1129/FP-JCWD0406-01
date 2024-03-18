import Delivered from './Components/Delivered';
import Carousel from './Components/Hero';
import Category from './Components/Category';
import ProductList from './Components/ProductList';
import MobileNavBar from '@/components/MobileNavBar';
import { Header } from '@/components/Header';

const Home = () => {
  return (
    <main>
      <Header/>
      {/* <NavbarComp /> */}
      <Delivered />
      <Carousel />
      <Category />
      <ProductList />
      <MobileNavBar />
    </main>
  );
};

export default Home;
