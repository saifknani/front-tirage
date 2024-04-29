import React, { useState } from "react";

const Jeuxtable = ({ playersData, winner, animateColor, rollingAnimation }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const calculateAnimationDelay = (index, totalChildren) => {
    const animationDuration = 1;
    const delayIncrement = animationDuration / totalChildren;
    return `${index * delayIncrement}s`;
  };

  // Filtrer les données des joueurs pour ne montrer que le gagnant
  const filteredPlayersData = winner ? playersData.filter(player => player.firstName === winner.firstName && player.lastName === winner.lastName) : playersData;

  return (
    <div className={`flex w-full flex-col ${winner ? "winner-selected fade-in" : "fade-out"}`}>
      <div className="w-full flex justify-center overflow-x-scroll lg:overflow-x-hidden">
        <div className="w-full flex flex-col justify-between items-center p-2">
          <div style={{ marginBottom: "100px" }}>
            <span className={`participant-name ${winner ? "winner" : ""} ${winner ? "fade-in" : "fade-out"}`} style={{ fontSize: "4.2em" } }>
              {winner ? `${winner.firstName} ${winner.lastName}` : "Participant Name"}
            </span>
          </div>
          <div className="w-full gap-3 grid grid-cols-10 card bg-red-500">
            {filteredPlayersData.map((tableData, index) => (
              <div
                key={index}
                className={`player-item ${rollingAnimation ? "child" : ""} p-2 rounded-xl bg-orange-500 ${index === hoveredIndex ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: calculateAnimationDelay(index, filteredPlayersData.length) }}
              >
                <div>
                  <div>{tableData.firstName}</div>
                  <div>{tableData.lastName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {winner && (
        <div className={`text-green-500 text-center ${winner ? "fade-in" : "fade-out"}`}>{`${winner.firstName} ${winner.lastName}`} a gagné !</div>
      )}
    </div>
  );
};

export default Jeuxtable;