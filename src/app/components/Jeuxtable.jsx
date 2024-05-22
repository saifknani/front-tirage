"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
const Jeuxtable = ({ playersData, winner, rollingAnimation }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { winnerPlayer } = useContext(UserContext);
  const calculateAnimationDelay = (index, totalChildren) => {
    const animationDuration = 1;
    const delayIncrement = animationDuration / totalChildren;
    return `${index * delayIncrement}s`;
  };

  console.log(playersData);
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full flex flex-col justify-between items-center p-2">
        <div className="w-full flex justify-center items-center">
          <span className="text-center font-bold text-6xl text-[#2B77BB] mt-16">
            Participant Name
          </span>
        </div>
        <div className="flex flex-wrap w-full items-center justify-center p-4 gap-8 mt-16">
          {playersData.map((tableData, index) => (
            <div
              key={index}
              className={` flex justify-center flex-col items-center ${
                rollingAnimation ? "child" : ""
              } ${
                tableData.winner ? "bg-green-400" : "bg-[#ccc]"
              } p-2 rounded-xl w-25 h-25 `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animationDelay: calculateAnimationDelay(
                  index,
                  playersData.length
                ),
              }}
            >
              <span className="text-white font-medium text-3xl">
                {tableData.firstName}
              </span>
              <span className="text-white font-medium text-3xl">
                {tableData.lastName}
              </span>
            </div>
          ))}
        </div>
        {winnerPlayer && (
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <h1>The Winner</h1>
 <div
            className={` flex justify-center flex-col items-center bg-green-400 p-2 rounded-xl w-25 h-25 `}
          >
            <span className="text-white font-medium text-3xl">
              {winnerPlayer.firstName}
            </span>
            <span className="text-white font-medium text-3xl">
              {winnerPlayer.lastName}
            </span>
          </div>
          </div>
         
        )}
      </div>
    </div>
  );
};

export default Jeuxtable;
