import React from "react";

export const CRUDPlayerStatsForm = ({statsID, timeframe, PTS, AST, REB, PIE, playerID, 
    onStatsIDChange, onTimeFrameChange, onPTSChange, 
    onASTChange, onREBChange, onPIEChange, onPlayerIDChange, onAdd, onEdit, onDelete}) => {

    const handleStatsIDChange = (event) => {
        onStatsIDChange(event.target.value);
    }

    const handleTimeFrameChange = (event) => {
        onTimeFrameChange(event.target.value);
    }

    const handlePTSChange = (event) => {
        onPTSChange(event.target.value);
    }

    const handleASTChange = (event) => {
        onASTChange(event.target.value);
    }

    const handleREBChange = (event) => {
        onREBChange(event.target.value);
    }

    const handlePIEChange = (event) => {
        onPIEChange(event.target.value);
    }

    const handlePlayerIDChange = (event) => {
        onPlayerIDChange(event.target.value);
    }

    return(
        <>
            
            <h3>Stats ID</h3><br></br>
            <input type = "number" required value = {statsID} onChange = {handleStatsIDChange}></input>
            <h3>Time Frame</h3><br></br>
            <input type = "text" required value = {timeframe} onChange = {handleTimeFrameChange}></input>
            <h3>PTS</h3><br></br>
            <input type = "text" required value = {PTS} onChange = {handlePTSChange}></input>
            <h3>AST</h3><br></br>
            <input type = "text" required value = {AST} onChange = {handleASTChange}></input>
            <h3>REB</h3><br></br>
            <input type = "text" required value = {REB} onChange = {handleREBChange}></input>
            <h3>PIE</h3><br></br>
            <input type = "text" required value = {PIE} onChange = {handlePIEChange}></input>
            <h3>Player ID</h3><br></br>
            <input type = "number" required value = {playerID} onChange = {handlePlayerIDChange}></input>
            <br></br><br></br>
            <button onClick = {onAdd}>Add</button>
            <button onClick = {onEdit}>Edit</button>
            <button onClick = {onDelete}>Delete</button>
        </>
    )
}