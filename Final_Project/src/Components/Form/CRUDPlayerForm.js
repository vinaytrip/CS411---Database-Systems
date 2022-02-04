import React from "react";

export const CRUDPlayersForm = ({playerID, playerName, playerPos, playerTeamID, playerCountry, playerSchool, 
    onPlayerIDChange, onPlayerNameChange, onPlayerPosChange, 
    onPlayerTeamIDChange, onPlayerCountryChange, onPlayerSchoolChange, onAdd, onEdit, onDelete}) => {

    const handlePlayerIDChange = (event) => {
        onPlayerIDChange(event.target.value);
    }

    const handlePlayerNameChange = (event) => {
        onPlayerNameChange(event.target.value);
    }

    const handlePlayerPosChange = (event) => {
        onPlayerPosChange(event.target.value);
    }

    const handlePlayerTeamIDChange = (event) => {
        onPlayerTeamIDChange(event.target.value);
    }

    const handlePlayerCountryChange = (event) => {
        onPlayerCountryChange(event.target.value);
    }

    const handlePlayerSchoolChange = (event) => {
        onPlayerSchoolChange(event.target.value);
    }

    return(
        <>
            
            <h3>Player ID</h3><br></br>
            <input type = "number" required value = {playerID} onChange = {handlePlayerIDChange}></input>
            <h3>Player Name</h3><br></br>
            <input type = "text" required value = {playerName} onChange = {handlePlayerNameChange}></input>
            <h3>Player Position</h3><br></br>
            <input type = "text" required value = {playerPos} onChange = {handlePlayerPosChange}></input>
            <h3>Player Team ID</h3><br></br>
            <input type = "text" required value = {playerTeamID} onChange = {handlePlayerTeamIDChange}></input>
            <h3>Player Country</h3><br></br>
            <input type = "text" required value = {playerCountry} onChange = {handlePlayerCountryChange}></input>
            <h3>Player School</h3><br></br>
            <input type = "text" required value = {playerSchool} onChange = {handlePlayerSchoolChange}></input>
            <br></br><br></br>
            <button onClick = {onAdd}>Add</button>
            <button onClick = {onEdit}>Edit</button>
            <button onClick = {onDelete}>Delete</button>
        </>
    )
}