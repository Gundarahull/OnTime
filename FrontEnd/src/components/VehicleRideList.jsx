import React from "react";

const VehicleRideList = ({setIsVehiclePanel,setVehicleConfirmation,vehicleConfirmation,isVehiclePanel}) => {
  return (
    <div>
      <div
        className={`fixed z-10 bottom-0 p-3 bg-white w-full rounded-tr-xl rounded-tl-xl ${
          isVehiclePanel && "translate-y-full "
        }`}
      >
        <div className="flex items-center justify-between pt-1">
          <h1 className="text-2xl  font-semibold pb-2">Choose Vehicle</h1>
          <img
            onClick={() => {
              setIsVehiclePanel(true);
            }}
            src="public\arrow-down-double-line.png"
            alt="arrow"
            srcset=""
          />
        </div>
        <div
          onClick={() => {
            setVehicleConfirmation(!vehicleConfirmation);
          }}
          className="mt-2 mb-2 flex p-1 border-2   border-gray-500 items-center justify-between gap-2 w-full hover:border-2 active:border-black active:rounded-xl rounded-lg"
        >
          <div className="">
            <img width="80" height="80" src="public\Car.png" alt="" srcset="" />
          </div>

          <div className="">
            <div className="flex items-center gap-1">
              <h1 className="font-bold">OnTime Go</h1>
              <img
                width="26"
                height="26"
                src="https://img.icons8.com/material-sharp/96/user.png"
                alt="user"
              />
              4
            </div>

            <h1 className="font-semibold">Take 4 mins away</h1>
            <h1 className="text-[13px]">Afforadable and comfort prices</h1>
          </div>
          <div className="font-medium">₹ 193.30</div>
        </div>
        <div className="mt-2 mb-2 flex p-1 border-2  border-gray-500 items-center justify-between gap-2 w-full hover:border-2 active:border-black active:rounded-xl rounded-lg">
          <div className="">
            <img
              width="80"
              height="80"
              src="https://img.pikbest.com/origin/10/10/88/82NpIkbEsTf4S.png!w700wp"
              alt=""
              srcset=""
            />
          </div>

          <div className="">
            <div className="flex items-center gap-1">
              <h1 className="font-bold">OnTime Auto</h1>
              <img
                width="26"
                height="26"
                src="https://img.icons8.com/material-sharp/96/user.png"
                alt="user"
              />
              3
            </div>

            <h1 className="font-semibold">Take 3 mins away</h1>
            <h1 className="text-[13px]">Afforadable and comfort prices</h1>
          </div>
          <div className="font-medium">₹ 69.69</div>
        </div>
        <div className="mt-2 mb-2 flex p-1 border-2  border-gray-500 items-center justify-between gap-2 w-full hover:border-2 active:border-black active:rounded-xl rounded-lg">
          <div className="">
            <img
              width="80"
              height="80"
              src="public\MotorCycle.png"
              alt=""
              srcset=""
            />
          </div>

          <div className="">
            <div className="flex items-center gap-1">
              <h1 className="font-bold">OnTime Moto</h1>
              <img
                width="26"
                height="26"
                src="https://img.icons8.com/material-sharp/96/user.png"
                alt="user"
              />
              1
            </div>

            <h1 className="font-semibold">Take 2 mins away</h1>
            <h1 className="text-[13px]">Afforadable and comfort prices</h1>
          </div>
          <div className="font-medium">₹ 79.79</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleRideList;
