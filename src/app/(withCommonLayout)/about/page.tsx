"use client";
import React from "react";
import { motion } from "framer-motion"; // For animations

const About = () => {
  return (
    // <div className=" min-h-screen px-5 py-10 ">
    //   <div className=" ">
    //     <motion.h1
    //       animate={{ opacity: 1, y: 0 }}
    //       className="text-4xl font-bold text-center text-gray-800 mb-8"
    //       initial={{ opacity: 0, y: -50 }}
    //       transition={{ duration: 0.8 }}
    //     >
    //       About Travel Tips & Destination Guides
    //     </motion.h1>

    //     <motion.p
    //       animate={{ opacity: 1 }}
    //       className="text-lg text-gray-700 text-center mb-6"
    //       initial={{ opacity: 0 }}
    //       transition={{ delay: 0.3, duration: 1 }}
    //     >
    //       Welcome to Travel Tips & Destination Guides! Our platform is designed
    //       to build an engaging community of travel enthusiasts, enabling users
    //       to share their personal travel stories, exchange valuable tips, and
    //       interact with fellow travelers.
    //     </motion.p>

    //     <motion.div
    //       animate={{ opacity: 1 }}
    //       className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
    //       initial={{ opacity: 0 }}
    //       transition={{ delay: 0.5, duration: 1 }}
    //     >
    //       <div className="flex flex-col items-center">
    //         <img
    //           alt="Secure Authentication"
    //           className="w-40 h-40 rounded-full shadow-lg mb-4"
    //           src="https://via.placeholder.com/300"
    //         />
    //         <h3 className="text-2xl font-semibold text-gray-800">
    //           Secure Authentication
    //         </h3>
    //         <p className="text-gray-600 text-center mt-2">
    //           Implementing JWT-based authentication to keep your data secure
    //           while browsing and posting travel content.
    //         </p>
    //       </div>

    //       <div className="flex flex-col items-center">
    //         <img
    //           alt="Rich Travel Content"
    //           className="w-40 h-40 rounded-full shadow-lg mb-4"
    //           src="https://via.placeholder.com/300"
    //         />
    //         <h3 className="text-2xl font-semibold text-gray-800">
    //           Rich Travel Content
    //         </h3>
    //         <p className="text-gray-600 text-center mt-2">
    //           Share your stories and tips with the community, complete with
    //           images and a rich text editor for dynamic travel posts.
    //         </p>
    //       </div>

    //       <div className="flex flex-col items-center">
    //         <img
    //           alt="Responsive Design"
    //           className="w-40 h-40 rounded-full shadow-lg mb-4"
    //           src="https://via.placeholder.com/300"
    //         />
    //         <h3 className="text-2xl font-semibold text-gray-800">
    //           Responsive Design
    //         </h3>
    //         <p className="text-gray-600 text-center mt-2">
    //           Enjoy seamless browsing across all devices, whether you're on
    //           desktop, tablet, or mobile.
    //         </p>
    //       </div>

    //       <div className="flex flex-col items-center">
    //         <img
    //           alt="Engage and Discover"
    //           className="w-40 h-40 rounded-full shadow-lg mb-4"
    //           src="https://via.placeholder.com/300"
    //         />
    //         <h3 className="text-2xl font-semibold text-gray-800">
    //           Engage and Discover
    //         </h3>
    //         <p className="text-gray-600 text-center mt-2">
    //           Follow other travelers, upvote posts, and find the best travel
    //           tips with our social features and filtering options.
    //         </p>
    //       </div>
    //     </motion.div>
    //   </div>
    // </div>
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
              <img
                className=" rounded-xl object-cover"
                src="https://pagedone.io/asset/uploads/1717741205.png"
                alt="about Us image"
              />
            </div>
            <img
              className="sm:ml-0 ml-auto rounded-xl object-cover"
              src="https://pagedone.io/asset/uploads/1717741215.png"
              alt="about Us image"
            />
          </div>
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Empowering Each Other to Succeed
                </h2>
                <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                  Every project we've undertaken has been a collaborative
                  effort, where every person involved has left their mark.
                  Together, we've not only constructed buildings but also built
                  enduring connections that define our success story.
                </p>
              </div>
              <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    33+
                  </h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Years of Experience
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    125+
                  </h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Successful Projects
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    52+
                  </h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Happy Clients
                  </h6>
                </div>
              </div>
            </div>
            <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
              <span className="px-1.5 text-white text-sm font-medium leading-6">
                Read More
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
