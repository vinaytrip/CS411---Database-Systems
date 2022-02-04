import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const PlayerCard = ({playerList}) => {
    console.log(playerList)
    return (
        <>
            {playerList.map(player => {
                return (
                    <ul key = {player.id}>
                        <Link to = {`/players/${player.id}`}><li>{player.name}</li></Link>
                    </ul>
                )
            })}
        </>
    )
}