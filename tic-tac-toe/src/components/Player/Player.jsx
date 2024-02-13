import { useState } from "react";
import "./Player.scss";
export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  
  // Function to toggle editing mode and update player's name
  const toggleEditing = () => {
    setIsEditing((editing) => !editing);
    if(isEditing){
      // Update player's name when editing mode is turned off
      onChangeName(symbol, playerName)
    }
  };
  
  // Function to handle change in player's name
  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };
  
  // Determine whether to display player's name as text or input field based on editing mode
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        onChange={handleNameChange}
        type="text"
        required
        value={playerName}
      />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">{editablePlayerName}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
