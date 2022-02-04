import React, {useState, useEffect} from "react";

export const PlayerInfo = ({playerInfo}) => {
    console.log(playerInfo)
    return (
        <>
        <h3>Name - {playerInfo.name}</h3>
        <h3>Birth Country - {playerInfo.country}</h3>
        <h3>Position - {playerInfo.position}</h3>
        <h3>Team - {playerInfo.teamName}</h3>
        <h3>Alma Mater - {playerInfo.school}</h3>
        {
            playerInfo.MVP ?
            <h3>MVP? YES</h3> :
            <h3>MVP? NO</h3>
        }
        {
            playerInfo.topAlum ?
            <h3>Top Alum? YES</h3> :
            <h3>Top Alum? NO</h3>
        }
        {
            playerInfo.starPlayer ?
            <h3>Star Player From Country? YES</h3> :
            <h3>Star Player From Country? NO</h3>
        }
        </>
    )
}