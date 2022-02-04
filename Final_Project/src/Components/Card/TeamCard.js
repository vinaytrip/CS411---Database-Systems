import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const TeamCard = ({teamList}) => {
    console.log(teamList)
    return (
        <>
            {teamList.map(team => {
                return (
                    <ul key = {team.id}>
                        <Link to = {`/teams/${team.id}`}><li>{team.name}</li></Link>
                    </ul>
                )
            })}
        </>
    )
}