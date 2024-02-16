import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const poppins = Poppins({ subsets: ['latin'], weight: '600' });
const poppins2 = Poppins({ subsets: ['latin'], weight: '400' });

const categories = [
  { name: 'Vegetables', icon: '/vegetables.png', href: '/category2' },
  { name: 'Fruits', icon: '/fruits.png', href: '/category1' },
  { name: 'Dairy', icon: '/dairy.png', href: '/category3' },
  { name: 'Bakery', icon: '/bakery.png', href: '/category4' },
  { name: 'Beverages', icon: '/beverages.png', href: '/category5' },
  { name: 'Pantry', icon: '/pantry.png', href: '/category6' },
];

const Category = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 pt-20 ">
        <h1
          className={`${poppins.className} text-2xl sm:text-3xl lg:text-4xl mb-6 text-left`}
        >
          Market Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="bg-white rounded-lg shadow-md transform transition duration-300 hover:shadow-lg">
                  <Image
                    width={200}
                    height={300}
                    src={category.icon}
                    alt={category.name}
                  />
                </div>
                <span className={`${poppins2.className} mt-2 text-[#848484]`}>
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
