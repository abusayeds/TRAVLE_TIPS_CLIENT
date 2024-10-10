import Link from "next/link";
import React, { useState, useEffect } from "react";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPqwd5MR_ntIpkwTnVbVTA0E-6xP_RD0a81YE6WuHWKL2yiCWTAcycV66HPUf7cB-Ub8s&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiW1MfyOHGdnfkvq2hxPKXPy5_sl35HHaFxhiHXDyeTq2sSBExBCVs8kxMOzDuiJKGUs&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF24rrbceCeqSKefAe6k-EDziE7iaChEsQDjr7EhksTH9zua4ugXsIx1TSEKqJkldH4HM&usqp=CAU",
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

        setTimeout(() => {
          setAnimate(true);
        }, 500);
      }, 4000);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <main
      className="relative w-full h-screen bg-cover bg-center transition-all duration-1000 ease-out flex items-center justify-center"
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      <section
        className={`flex flex-col justify-center items-center gap-20 text-white w-full px-4 md:px-20 transform transition-transform duration-1000 ease-in-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="text-center">
          <p className="uppercase font-bodyfont">
            There is no post here!
          </p>
        </div>
        <Link
          href="/login"
          className="font-titlefont uppercase bg-designColor opacity-80 hover:opacity-100 p-4 rounded transition-opacity"
        >
          Log in now!
        </Link>
      </section>
    </main>
  );
};

export default Hero;
