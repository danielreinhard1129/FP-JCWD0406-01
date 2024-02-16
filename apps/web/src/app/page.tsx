import Delivered from './Components/Delivered';
import Carousel from './Components/Hero';
import Category from './Components/Category';
import ProductList from './Components/ProductList';

const Home = () => {
  return (
    <main>
      <Delivered />
      <Carousel />
      <Category />
      <ProductList />
    </main>
  );
};

export default Home;
