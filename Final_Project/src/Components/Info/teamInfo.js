import React, {useState, useEffect} from "react";

export const TeamInfo = ({teamInfo}) => {
    return (
        <>
        <h3>Name - {teamInfo.teamName}</h3>
        <h3>City - {teamInfo.teamCity}</h3>
        </>
    )
}