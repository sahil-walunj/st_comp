import React from "react";
import "../app.css";
function Tile({ item }) {
  return (
    <div className="bg-[#CED4DA] p-4 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 items-start w-full">
      {/* Left Section - Image */}
      <div className="col-span-1">
        <img
          src={item.imglink}
          alt={item.title}
          className="w-35 h-28 object-cover rounded-lg bg-white p-2"
        />
      </div>

      {/* Right Section - Buttons */}
      <div className="col-span-1 flex flex-col space-y-1 items-end">
        <a
          href={item.zlink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center bg-yellow-300 text-green-800 font-bold py-2 px-4 rounded-lg text-xs sm:text-sm w-34"
        >
          Blinkit <span>{item.zprice}</span>
        </a>
        <a
          href={item.swiggyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-xs sm:text-sm w-34"
        >
          Swiggy <span>₹{item.swiggyPrice}</span>
        </a>
        <a
          href={item.zeptoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-xs sm:text-sm w-34"
        >
          Zepto <span>{item.zeptoPrice}</span>
        </a>
      </div>

      {/* Title Section */}
      <div className="col-span-4 mt-2 flex justify-between items-center">
        <div className="truncate text-left text-sm font-semibold text-gray-900 w-2/3">
          {item.title}
        </div>
        {item.quantity !== "N" && item.quantity !== "Select Unit" && (
          <span className="text-gray-700 w-1/3 text-right truncate">{item.quantity}</span>
        )}
      </div>
    </div>
  );
};

export default Tile;
