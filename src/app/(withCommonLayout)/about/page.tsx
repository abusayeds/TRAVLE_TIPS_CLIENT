/* eslint-disable react/jsx-sort-props */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const About = () => {
  return (
    <section className="py-24 relative ">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
              <img
                alt="Travel Destination 1"
                className="rounded-xl object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCiEgVEVYFCitTIOCIHwyd-PQlA07punSv-fMkOS2IiwFQthVF1JG7TCw-_ZmLHBVa68Y&usqp=CAU"
              />
            </div>
            <img
              alt="Travel Destination 2"
              className="sm:ml-0 ml-auto rounded-xl object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw0_AZOTD-vnbxzuAKurE1OeHBQFwzHQaBPUZOajWAobV6eYl1DJOv5k8Qs1MtwJBk3YQ&usqp=CAU"
            />
          </div>
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className=" text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Explore New Horizons with Us
                </h2>
                <p className=" text-base font-normal leading-relaxed lg:text-start text-center">
                  Whether it s an adventure into the wild, a business trip for
                  success, or a journey of exploration, we provide unmatched
                  experiences tailored to your desires. Let us take you beyond
                  your expectations.
                </p>
              </div>

              {/* Travel Types Section */}
              <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className=" text-4xl font-bold font-manrope leading-normal">
                    50+
                  </h3>
                  <h6 className=" text-base font-normal leading-relaxed">
                    Adventure Tours
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className=" text-4xl font-bold font-manrope leading-normal">
                    30+
                  </h4>
                  <h6 className=" text-base font-normal leading-relaxed">
                    Business Travel Solutions
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className=" text-4xl font-bold font-manrope leading-normal">
                    100+
                  </h4>
                  <h6 className=" text-base font-normal leading-relaxed">
                    Exploration Expeditions
                  </h6>
                </div>
              </div>
            </div>

            <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
              <span className="px-1.5 text-sm font-medium leading-6">
                Read More
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 w-full grid lg:grid-cols-3 grid-cols-1 gap-12">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
            <img
              alt="Adventure"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsY2rhuGrKWJOntdHgLrpGr1ajn7TCZoQJU700I8DxHfcL9e1OaOJeAHUyMcINFaL5B80&usqp=CAU"
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-gray-900 text-2xl font-bold">
              Adventure Travel
            </h3>
            <p className=" text-gray-500 text-base mt-2">
              Push your limits and explore rugged terrains, soaring mountains,
              and deep jungles. Our adventure tours are designed for
              thrill-seekers who crave excitement.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-800">
              Learn More
            </button>
          </div>

          {/* Business Travel Section */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
            <img
              alt="Business Travel"
              src="https://www.paxes.com/blog/wp-content/uploads/2022/11/Things-to-do-on-Business-Travel.jpg"
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-gray-900 text-2xl font-bold">
              Business Travel
            </h3>
            <p className=" text-gray-500 text-base mt-2">
              Make your business trips seamless and productive with our tailored
              corporate travel services. We handle logistics so you can focus on
              business.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-800">
              Learn More
            </button>
          </div>

          {/* Exploration Travel Section */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
            <img
              alt="Exploration"
              src="https://i0.wp.com/exploration.travel/wp-content/uploads/2023/05/thai.jpg?resize=1124%2C750&ssl=1"
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-gray-900 text-2xl font-bold">
              Exploration Travel
            </h3>
            <p className=" text-gray-500 text-base mt-2">
              Dive deep into new cultures, explore hidden gems, and discover
              places untouched by mass tourism. Our exploration tours are
              perfect for the curious traveler.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-800">
              Learn More
            </button>
          </div>
        </div>

        {/* Interactive Map Section with Animation */}
        <motion.div
          className="mt-16 w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold">Explore Our Destinations</h3>
          <motion.p
            className=" text-base mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Use the interactive map to discover the places we ve traveled to.
          </motion.p>
          <motion.div
            className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=' <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A sample destination. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
