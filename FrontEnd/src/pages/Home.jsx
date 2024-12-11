import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="bg-contain bg-no-repeat bg-center bg-[url(https://cdni.iconscout.com/illustration/premium/thumb/taxi-booking-offer-illustration-download-in-svg-png-gif-file-formats--cab-service-ride-hailing-pack-services-illustrations-10138608.png)] w-full  h-screen flex flex-col justify-between bg-orange-500">
        <div className="w-full p-8 m-4">
          <h2 className="w-[100] h-[100] font-bold text-3xl">OnTime</h2>
          {/* <img
            src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
            alt=""
            srcset=""
            width={100}
            height={100}
          /> */}
        </div>
        <div className="bg-white h-32 flex flex-col  justify-center gap-2">
          <h2 className="text-2xl font-extrabold relative bottom-0 text-center">
            Get Started with OnTime
          </h2>
          <div className="flex items-center justify-center">
            <Link to='/login' className="flex items-center justify-center mt-1 bg-black text-white font-medium py-2 px-4 rounded-md shadow-md w-[320px] h-12 mb-2">
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
