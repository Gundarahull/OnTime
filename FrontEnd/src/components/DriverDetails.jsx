import React from "react";

const DriverDetails = ({
  vehicleConfirmation,
  setVehicleConfirmation,
  rideConfirm,
  setRideConfirm,
}) => {
  return (
    <div>
      <div>
        <div
          className={`fixed z-10 bottom-0 px-2  bg-white w-full rounded-tr-xl rounded-tl-xl 
              ${vehicleConfirmation && "translate-y-full "}
            `}
        >
          <div className="">
            {/* <div className="flex items-center justify-center rounded-2xl">
                <img
                  onClick={(e) => {
                    setVehicleConfirmation(!vehicleConfirmation);
                    console.log(" i am clicking...");
                    setRideConfirm(false);
                  }}
                  width="44"
                  height="24"
                  src="https://img.icons8.com/material-two-tone/24/horizontal-line.png"
                  alt="horizontal-line"
                />
              </div> */}
            <div className="flex justify-between p-4  border-b-2 ">
              <div className="flex items-center justify-center">
                <h1 className="text-lg  font-semibold pb-2 text-center">
                  Meet at the pickup point
                </h1>
              </div>
              <div className="bg-black text-white w-[60px] h-[60px] flex items-center justify-center">
                2 min
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between px-3 mb-4">
              <div className="flex items-center gap-4 px-4 relative">
                <div className=" relative z-10">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://images5.alphacoders.com/111/thumb-1920-1114139.jpg"
                    alt="Driver pic"
                  />
                </div>
                <div className=" -ml-10 relative">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://c4.wallpaperflare.com/wallpaper/935/268/1011/movie-spider-man-into-the-spider-verse-marvel-comics-miles-morales-spider-man-hd-wallpaper-preview.jpg"
                    alt="Driver pic"
                  />
                </div>
              </div>

              <div className="text-right">
                <h1 className="text-gray-400 font-semibold text-base">
                  LOOSER
                </h1>
                <h1 className="text-xl font-bold">KA08AS1234</h1>
                <h1 className="text-gray-400 text-base font-semibold">
                  Mahindra THAR ROXX
                </h1>
                <div className="flex justify-end gap-2">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/material-outlined/24/filled-star.png"
                    alt="filled-star"
                  />
                  4.9
                </div>
              </div>
            </div>
          </div>
          {/* <div className="p-2 ml-3">
              <input className="bg-gray-300 rounded-xl p-2 placeholder:text-black "  type="text" placeholder="Send a message..." />
            </div> */}
          <div className="flex justify-between p-7 items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/ink/48/228BE6/warning-shield.png"
                  alt="warning-shield"
                />
              </div>
              <h1 className="font-semibold">Safety</h1>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/isometric-line/50/228BE6/marker.png"
                  alt="marker"
                />
              </div>
              <h1 className="font-semibold">Share my trip</h1>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/228BE6/apple-phone.png"
                  alt="apple-phone"
                />
              </div>
              <h1 className="font-semibold">Call Captain</h1>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
