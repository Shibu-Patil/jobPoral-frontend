import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const DropDown = ({ values,feildName }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropDown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleItems = (e, item) => {
    e.stopPropagation(); // prevent closing dropdown

    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };
const removeItems=(e,ele)=>{
    setSelectedItems(selectedItems.filter((el)=>el!=ele))
    setShowDropdown(false)
    e.stopPropagation()
}
  const unselectedItems = values.filter((v) => !selectedItems.includes(v));

  return (
    <div
      className="size-full  border-b-2 flex justify-between px-3 items-center relative"
      onClick={toggleDropDown}
    >
            <div className="flex gap-4 max-w-[402px] overflow-x-scroll">
            {!selectedItems.length
                ? feildName
                : selectedItems.reverse().map((ele, index) => (
                    <div
                    key={index}
                    className="bg-black/10 px-2 py-1 rounded-sm flex items-center gap-1 relative"
                    >
                    {ele}
                    <div className="text-red-600 text-lg" onClick={(e)=>{
                        removeItems(e,ele)
                    }}>
                        <RxCross2 />
                    </div>
                    </div>
                ))}
            </div>


      <div
        className={`text-xl duration-75 ${
          showDropdown ? "rotate-180" : "rotate-0"
        }`}
      >
        <IoIosArrowDown />
      </div>

      {showDropdown && (
        <div className="absolute w-full bg-white border-2 rounded-b-2xl top-10 left-0 z-10 flex flex-col">
          {unselectedItems.length > 0 ? (
            unselectedItems.map((ele, index) => (
              <div
                key={index}
                className={`hover:bg-black/10 p-1.5 ${
                  index === unselectedItems.length - 1 && "rounded-b-2xl"
                }`}
                onClick={(e) => handleItems(e, ele)}
              >
                {ele}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500 text-sm text-center">
              All items selected
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
