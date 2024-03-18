import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { AiOutlineSkype } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="p-10 bg-gray-800 text-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="mb-5">
              <h4 className="text-2xl pb-4">Company</h4>
              <p className="text-gray-400">
                10250 jalan taman sari <br />
                kecematan Tanah Abang <br />
                Indonesia <br />
                <br />
                <strong>Phone:</strong>+62 1231 1231 <br />
                <strong>Email:</strong>Grocery@mail.com <br />
              </p>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">About Us</h4>
              <ul className="text-gray-400">
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Grocery Story
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Work With Us
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Coporate News
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Investors
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">Useful Links</h4>
              <ul className="text-gray-400">
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Secure Payment
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Terms of Use
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-white">
                    Archived Products
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">Join Our Newsletter</h4>
              <p className="text-gray-400 pb-2">
                Join 25,000 others and never miss out on new tips, tutorials,
                and more
              </p>
              <form className="flex flex-row flex-wrap">
                <input
                  type="text"
                  className="text-gray-400 w-2/3 p-2 focus:border-white"
                  placeholder="email@example.com"
                />
                <button className="p-2 w-1/3 bg-green-500 text-white hover:bg-green-600">
                  Subscirbe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-gray-900 text-gray-400 px-10'>
        <div className='max-w-7xl flex flex-col sm:flex-row py-4 mx-auto justify-between items-center'>
          <div className='text-center'>
            <div>
              Copyright <strong><span>company</span></strong>, All Rights Reserved
            </div>
            <div>
              Made by <a href="#" className='text-gray-400'>Grocery</a>
            </div>
          </div>
          <div className='text-xl text-white'>
            <a href="#" className='w-10 h-10 p-[10px] rounded-full bg-gray-500 hover:bg-gray-600 inline-block'><FaTwitter /></a>
            <a href="#" className='w-10 h-10 p-[10px] rounded-full bg-gray-500 hover:bg-gray-600 inline-block'><FaInstagram /></a>
            <a href="#" className='w-10 h-10 p-[10px] rounded-full bg-gray-500 hover:bg-gray-600 inline-block'><FaFacebook /></a>
            <a href="#" className='w-10 h-10 p-[10px] rounded-full bg-gray-500 hover:bg-gray-600 inline-block'><AiOutlineSkype /></a>
            <a href="#" className='w-10 h-10 p-[10px] rounded-full bg-gray-500 hover:bg-gray-600 inline-block'><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
