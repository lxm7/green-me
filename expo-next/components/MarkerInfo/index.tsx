import React from "react";

import { Business } from "@components/MapContainer/types";

interface MarkerInfoProps {
  business: Business;
  isHighest: boolean;
}

const MarkerInfo: React.FC<MarkerInfoProps> = ({ business, isHighest }) => {
  const { name, co2e, greenScore } = business.document;

  return (
    <div className="relative">
      {greenScore && isHighest && (
        <div className="w-full relative bottom-[-8px] text-white text-center bg-pink-500 px-1 rounded-sm text-xs font-bold">
          Most Rewards*
        </div>
      )}
      <div className="bg-white px-4 py-2 rounded-md mt-1 text-xs">
        <div className="relative flex items-center">
          {/* Example image, replace with real image source */}
          <img
            src="https://placehold.co/40x40"
            alt={name}
            className="w-12 h-12 pr-2"
          />
          <div>
            <div className="font-semibold">
              {name} - {greenScore}
            </div>
            Co2e est: {co2e}
            <br />
            March 29th: 10AM - 2PM
          </div>
          <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
        </div>
      </div>
    </div>
  );
};

export default MarkerInfo;
