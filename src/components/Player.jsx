import { useState } from "react";

export default function Player({initialName, playerSymbol, isActive, onChangeName}) {
const [playerName, setPlayerName] = useState(initialName);
const [editMode, setEditMode] = useState(false);

function handleEditClick() {
    // setEditMode(!editMode);//true
    // setEditMode(!editMode);//true, as it not save the previous state to save prev value we needed to passs a function like below.
  setEditMode(editing => !editing);
    //pass a function here and it will get the current state value and also the previous value instead of directly using !editMode in the function as by doing that it wi not change the previous state.
    if(editMode){
      onChangeName(playerSymbol, playerName);
    }
    
}

function handleChange(event) {
    setPlayerName(event.target.value);
}

    
    return (    
        <li className={isActive ? "active" : ""}>
        <span className="player">
        {editMode? (<input type="text" required value={playerName} onChange={handleChange}/>) : (<span className="player-name">{playerName}</span>)}
        
      <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleEditClick}>{editMode? "Save" : "Edit" }</button> 
      </li>
    );
}