import React from "react";

const ConfirmRide = ({
  vehicleConfirmation,
  setVehicleConfirmation,
  rideConfirm,
  setRideConfirm,
}) => {
  return (
    <div>
      <div
        className={`fixed z-10 bottom-0 px-2  bg-white w-full rounded-tr-xl rounded-tl-xl ${
          vehicleConfirmation && "translate-y-full "
        }`}
      >
        <div className="">
          <div className="flex items-center justify-center rounded-2xl">
            <img
              onClick={(e) => {
                setVehicleConfirmation(!vehicleConfirmation);
              }}
              width="44"
              height="24"
              src="https://img.icons8.com/material-two-tone/24/horizontal-line.png"
              alt="horizontal-line"
            />
          </div>
          <h1 className="text-xl  font-semibold pb-2 text-center">
            Confirm Your Ride
          </h1>
        </div>
        <div className="flex items-center justify-center">
          {/* <img
            className="object-cover"
            height="100"
            width="300"
            src="https://i.pinimg.com/originals/1b/4b/94/1b4b94e01bc0fc69a326283c64ed63a6.gif"
            alt=""
          /> */}
        </div>
        <div className="flex flex-col w-full">
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
            <div>
              <h1 className="font-bold">₹69.69</h1>
              <h1 className="text-gray-400 font-medium">Cash</h1>
            </div>
          </div>
          <div className="py-2">
            <button
              onClick={() => {
                setRideConfirm(true);
              }}
              className="bg-green-500 rounded-xl text-xl font-semibold w-full p-1"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
