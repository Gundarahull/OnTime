import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <div className="px-2 right-0 top-2 fixed">
        <Link to="/">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/windows/32/smart-home-2.png"
            alt="smart-home-2"
          />
        </Link>
      </div>

      <div className="h-[50%] flex items-center justify-center ">
        <div className="border-2 rounded-[30px] border-black shadow-xl shadow-black">
          <h1 className="text-[80px] p-2 font-bold">OnTime</h1>
        </div>
      </div>
      <div className="h-1/2 p-2">
        <div className="flex flex-col w-full p-1">
          <div className="flex items-center justify-start gap-4 p-3 border-t-2 border-t-gray-300 rounded-full">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/place-marker--v1.png"
              alt="place-marker--v1"
            />
            <div>
              <h1 className="font-bold">562/11-A</h1>
              <h1 className="text-gray-400 font-medium">
                Thubarahalli, Bengaluru, Karnataka
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-3 border-t-2 border-t-gray-300 rounded-full">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/windows/32/square-full.png"
              alt="square-full"
            />
            <div>
              <h1 className="font-bold">D-Mart</h1>
              <h1 className="text-gray-400 font-medium">
                1st cross, Beside Dmart, Thubarahalli, WhiteField Bengaluru,
                Karnataka
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-3 border-t-2 border-t-gray-300 rounded-full">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-payment-method-ecommerce-tanah-basah-glyph-tanah-basah.png"
              alt="external-payment-method-ecommerce-tanah-basah-glyph-tanah-basah"
            />
            <div className="">
              <h1 className="font-bold">₹69.69</h1>
              <h1 className="text-gray-400 font-medium">Cash</h1>
            </div>
          </div>
        </div>
        <div className="py-2">
          <button
            className="bg-green-500 rounded-xl text-xl font-semibold w-full p-1"
            type="submit"
          >
            Make a payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
