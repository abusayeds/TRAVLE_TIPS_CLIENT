import Link from "next/link";
import React, { useEffect, useState } from "react";

const images = [
  "https://mytravelbackpack.com/wp-content/uploads/2022/04/travel.jpg",
  "https://cdn.kimkim.com/files/a/content_articles/featured_photos/9a04da548c6123b9aa0eaa85fd79c96b0dd800e1/big-9d645c1d039dc8002d25120167ba5e46.jpg",
  "https://wallpapers.com/images/featured/best-travel-background-04ml2h9wywaoo6ei.jpg",
  "https://images.pexels.com/photos/732629/pexels-photo-732629.jpeg",
];

const Landing = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="text-white  overflow-hidden relative">
      <section
        className="flex flex-col gap-y-5 justify-center items-center  w-screen h-screen bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <p className="  font-serif text-6xl">
          Let,s Enjoy Your Travel <br /> Tips and TripGoal
        </p>

        <Link
          className="bg-blue-400 flex justify-center items-center w-28 p-2 mt-8 rounded text-white transform hover:scale-105 transition-transform duration-300"
          href="/login"
        >
          <p className="ml-1">Log in now </p>
        </Link>
      </section>
    </div>
  );
};

export default Landing;
