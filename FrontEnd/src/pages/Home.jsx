import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useEffect } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleRideList from "../components/VehicleRideList";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import DriverDetails from "../components/DriverDetails";

const Home = () => {
  const [scrollUp, setScrollUp] = useState(false);
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const [isVehiclePanel, setIsVehiclePanel] = useState(true);
  const [vehicleConfirmation, setVehicleConfirmation] = useState(true);
  const [rideConfirm, setRideConfirm] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="h-screen bg -white flex flex-col justify-between relative">
        {/* //for temporary next we will search the image then https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif */}
        <div className="w-full h-full bg-[url(https://gifdb.com/images/high/map-confused-moose-cartoon-looking-directions-p0pgcqtzs7h95e4q.webp)]  object-cover bg-no-repeat bg-center">
          <h2 className="w-[100] h-[100] font-bold text-3xl m-8">OnTime</h2>
        </div>
        <div
          className={`w-full bg-white flex flex-col justify-end absolute bottom-0 ${
            scrollUp ? "h-screen" : "h-44"
          } transition-height duration-500 ease-in-out `}
        >
          <div
            className={`flex flex-col  ${
              scrollUp ? "h-[30%]" : "h-full"
            } p-4 relative transition-height`}
          >
            <div className="flex justify-between  ">
              <h1 className="text-2xl font-semibold">Find Trip</h1>
              <img
                onClick={() => {
                  setScrollUp(!scrollUp);
                }}
                src="public\arrow-down-double-line.png"
                alt="arrow"
                srcset=""
              />
            </div>

            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className="h-14 w-[3px] bg-black absolute left-[30px] top-[75px] rounded-xl"></div>
              <input
                type="text"
                name=""
                id=""
                value={pickUp}
                className="w-full bg-green-700 p-2 rounded-xl px-6 mt-4 placeholder:text-black text-xl"
                onChange={(e) => {
                  setPickUp(e.target.value);
                }}
                onClick={() => {
                  setScrollUp(true);
                }}
                placeholder="Yekkada Unnav "
              />
              <input
                type="text"
                name=""
                id=""
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                onClick={() => {
                  setScrollUp(true);
                }}
                className="w-full bg-green-700 p-2 rounded-xl px-6 mt-2 mb-2 placeholder:text-black text-xl"
                placeholder="Yekkadiki Vellali "
              />
            </form>
          </div>

          {/* Bottom Div Section */}
          {scrollUp && (
            <div className="h-[70%] bg-white p-4 transition-height duration-500 ease-in-out">
              <LocationSearchPanel
                isVehiclePanel={isVehiclePanel}
                setIsVehiclePanel={setIsVehiclePanel}
                scrollUp={scrollUp}
                setScrollUp={setScrollUp}
              />
            </div>
          )}
        </div>

        <VehicleRideList
          setIsVehiclePanel={setIsVehiclePanel}
          setVehicleConfirmation={setVehicleConfirmation}
          vehicleConfirmation={vehicleConfirmation}
          isVehiclePanel={isVehiclePanel}
        />

        <ConfirmRide
          vehicleConfirmation={vehicleConfirmation}
          setVehicleConfirmation={setVehicleConfirmation}
          rideConfirm={rideConfirm}
          setRideConfirm={setRideConfirm}
        />

        {rideConfirm && (
          <WaitingForDriver
            vehicleConfirmation={vehicleConfirmation}
            setVehicleConfirmation={setVehicleConfirmation}
            rideConfirm={rideConfirm}
            setRideConfirm={setRideConfirm}
          />
        )}

        {/* <DriverDetails
          vehicleConfirmation={vehicleConfirmation}
          setVehicleConfirmation={setVehicleConfirmation}
        /> */}
      </div>
    </>
  );
};

export default Home;
