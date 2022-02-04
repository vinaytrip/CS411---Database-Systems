import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const PlayerStatsCard = ({playerStatsList}) => {
    //console.log("HEllo world")
    console.log(playerStatsList)
    return (
        <>
            <h3>PTS - {playerStatsList.PTS}</h3>
            <h3>AST - {playerStatsList.AST}</h3>
            <h3>REB - {playerStatsList.REB}</h3>
            <h3>PIE - {playerStatsList.PIE}</h3>
            <h3>Time Frame - {playerStatsList.timeframe}</h3>


        </>
    )
}