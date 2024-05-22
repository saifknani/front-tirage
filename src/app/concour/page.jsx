"use client";
import React, { useState, useEffect,useContext } from "react";
import Jeuxtable from "../components/Jeuxtable";
import { getRandomPlayer, getAllPlayers } from "../api/player";
import CredsLayout from "../asset-page/layout";
import { UserContext } from "../context/UserContext";

function Page() {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winnerSelected, setWinnerSelected] = useState(false);
  const [disabled,setDisabled]=useState(false)
  
  const [rollingAnimation, setRollingAnimation] = useState(false);
//  useEffect(()=>{

//  })
  useEffect(() => {
    const disableButton=()=>{
      
      if (winnerSelected){
        setDisabled(true)
      }
    }
    fetchPlayers();disableButton()
  }, []);
 
  const fetchPlayers = async () => {
    try {
      const response = await getAllPlayers();
      setPlayers(response);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };
const {winnerPlayer,setWinnerPlayer}=useContext(UserContext)

  const handleRandomPlayer = async () => {
    setRollingAnimation(true);
    if (winnerSelected) {
      console.log("Il y a déjà un joueur gagnant.");
      alert(`${winner.firstName} ${winner.lastName} a déjà gagné !`);
      return;
    }
    try {
      const response = await getRandomPlayer();
     if (response){
      setWinnerSelected(true)
      setWinnerPlayer(response)
      setWinner(response)
      fetchPlayers()
      
      setTimeout(() => {
        
        setRollingAnimation(false);
      }, 2000);
    }
    } catch (error) {
      console.error("Error fetching random player:", error);
    }
  };

 

  return (
    <CredsLayout>
      <div className="flex flex-col gap-3 sm:p-6 p-3 w-full overflow-y-scroll ">
     
  {!winnerPlayer&&<button disabled={disabled} className="w-52 rounded-xl bg-[#2B77BB] text-white text-center self-center p-8 text-4xl font-medium" onClick={handleRandomPlayer}>
    Tirage
  </button>}


        <Jeuxtable rollingAnimation={rollingAnimation} playersData={players} winner={winner} />

      </div>
    </CredsLayout>
  );
}

export default Page;