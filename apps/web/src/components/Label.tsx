import { FaCartArrowDown } from 'react-icons/fa';
import { HiMiniArrowPathRoundedSquare } from 'react-icons/hi2';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { BsBoxSeam } from 'react-icons/bs';

const Label = () => {
  return (
    <>
      <div className="bg-[#34a853] text-[#fff8dd] p-8 md:flex row justify-between mx-2 md:mx-0 rounded-md">
        <div className="flex col items-center gap-8">
          <div>
            <FaCartArrowDown className="h-10 w-10" />
          </div>
          <div>
            <h1>Free Shipping</h1>
            <p>When ordering over Rp.500 k</p>
          </div>
        </div>
        <div className="flex col items-center gap-8 mt-2 md:mt-0">
          <div>
            <HiMiniArrowPathRoundedSquare className="h-10 w-10" />
          </div>
          <div>
            <h1>Free return</h1>
            <p>Get Return within 30 days</p>
          </div>
        </div>
        <div className="flex col items-center gap-8 mt-2 md:mt-0">
          <div>
            <RiSecurePaymentLine className="h-10 w-10" />
          </div>
          <div>
            <h1>Secure Payment</h1>
            <p>100% Secure Online Payment</p>
          </div>
        </div>
        <div className="flex col items-center gap-8 mt-2 md:mt-0">
          <div>
            <BsBoxSeam className="h-10 w-10" />
          </div>
          <div>
            <h1>Best Quality</h1>
            <p>Original Product Guarenteed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Label;
