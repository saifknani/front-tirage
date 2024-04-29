"use client";
import React, { useState, useEffect } from "react";
import Jeuxtable from "../components/Jeuxtable";
import { getRandomPlayer, getAllPlayers } from "../api/player";
import CredsLayout from "../asset-page/layout";

function Page() {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winnerSelected, setWinnerSelected] = useState(false);
  const [animateColor, setAnimateColor] = useState(false);
  const [rollingAnimation, setRollingAnimation] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await getAllPlayers();
      setPlayers(response);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleRandomPlayer = async () => {
    setRollingAnimation(true);
    if (winnerSelected) {
      console.log("Il y a déjà un joueur gagnant.");
      alert(`${winner.firstName} ${winner.lastName} a déjà gagné !`);
      return;
    }
    try {
      const response = await getRandomPlayer();
      setWinner(response);
      setWinnerSelected(true);
      setAnimateColor(true);
      setTimeout(() => {
        setAnimateColor(false);
        setRollingAnimation(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching random player:", error);
    }
  };

  return (
    <CredsLayout>
      <div className="flex flex-col gap-3 sm:p-6 p-3 w-full overflow-y-scroll">
      {!winnerSelected && (
  <button className="w-36 m-auto rounded-xl bg-[#2B77BB] text-white p-10" onClick={handleRandomPlayer}>
    Tirage
  </button>
)}

        <Jeuxtable rollingAnimation={rollingAnimation} playersData={players} winner={winner} animateColor={animateColor} />

      </div>
    </CredsLayout>
  );
}

export default Page;