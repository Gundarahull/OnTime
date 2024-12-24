import React from "react";

const LocationSearchPanel = ({
  isVehiclePanel,
  setIsVehiclePanel,
  scrollUp,
  setScrollUp,
}) => {
  const locations = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, magni!",
    "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime dolor labore, officia dolorem necessitatibus iste!",
    "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quos facere repellendus?",
  ];
  return (
    <>
      {locations.map((location, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setIsVehiclePanel(false);
              setScrollUp(!scrollUp);
            }}
            className={`w-full flex justify-start gap-1 m-1 mb-3 border-2 p-2 rounded-xl active:border-black `}
          >
            <div className=" flex justify-center items-center">
              <div className="w-[40px] h-[40px] mt-3">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios/50/place-marker--v1.png"
                  alt="place-marker--v1"
                />
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <h1 className="text-[14px]  font-medium">{location}</h1>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LocationSearchPanel;
