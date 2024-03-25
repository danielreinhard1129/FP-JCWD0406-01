/* eslint-disable @next/next/no-img-element */
import { Carousel } from 'flowbite-react';

const HeroSection = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-[520px] 2xl:h-[520px] rounded-md">
      <Carousel>
        <img
          src="https://assets.klikindomaret.com///products/promopage/HERO_BNR_TEBUS_MURAH_COOKING_NEEDS_16_MAR.jpg"
          alt="..."
        />
        <img
          src="https://assets.klikindomaret.com///products/promopage/HERO_BNR_KOLEKSI-KEMILAU-TOPLES-6-MAR_2.jpg"
          alt="..."
        />
        <img
          src="https://assets.klikindomaret.com///products/promopage/HERO_BNR_DIAPERS-OF-THE-MONTH-15-MAR.jpg"
          alt="..."
        />
        <img
          src="https://assets.klikindomaret.com///products/promopage/HERO_BNR_GARNIER-FAIR-16-MAR.jpg"
          alt="..."
        />
        <img
          src="https://assets.klikindomaret.com///products/promopage/HERO_BNR_SAYUR-BUAH-1-MAR.jpg"
          alt="..."
        />
      </Carousel>
    </div>
  );
};

export default HeroSection;
