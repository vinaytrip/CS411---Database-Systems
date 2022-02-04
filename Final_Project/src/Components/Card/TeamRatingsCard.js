import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const TeamRatingsCard = ({TeamRatingsList}) => {
    //console.log("HEllo world")
    //console.log(playerStatsList)
    return (
        <>
            <h3>TeamName - {TeamRatingsList.teamName}</h3>
            <h3>AST - {TeamRatingsList.ratings}</h3>


        </>
    )
}