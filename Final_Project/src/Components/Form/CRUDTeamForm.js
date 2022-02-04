import React from "react";

export const CRUDTeamForm = ({teamID, teamName, teamCity, 
    onTeamIDChange, onTeamNameChange, onTeamCityChange, onAdd, onEdit, onDelete}) => {

    const handleTeamIDChange = (event) => {
        onTeamIDChange(event.target.value);
    }

    const handleTeamNameChange = (event) => {
        onTeamNameChange(event.target.value);
    }

    const handleTeamCityChange = (event) => {
        onTeamCityChange(event.target.value);
    }

    return(
        <>
            
            <h3>Team ID</h3><br></br>
            <input type = "number" required value = {teamID} onChange = {handleTeamIDChange}></input>
            <h3>Team Name</h3><br></br>
            <input type = "text" required value = {teamName} onChange = {handleTeamNameChange}></input>
            <h3>Team City</h3><br></br>
            <input type = "text" required value = {teamCity} onChange = {handleTeamCityChange}></input>
            <br></br><br></br>
            <button onClick = {onAdd}>Add</button>
            <button onClick = {onEdit}>Edit</button>
            <button onClick = {onDelete}>Delete</button>
        </>
    )
}