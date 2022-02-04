import React, {useState, useEffect} from "react";
import {PlayerStatsCard} from "../Components/Card/PlayerStatsCard";
import {Form} from "../Components/Form/Form";

export const PlayerStats = () => {
    const [playerstats, setPlayerStats] = useState([])
    const [playerstats2, topPlayerStats] = useState([])
    const [search, setSearch] = useState("")

    const handleFormChange = (inputValue) => {
        setSearch(inputValue)
    }

    const handleFormSubmit = () => {
        console.log("form submitted")
        fetch(`/searchplayerstats/${search}`).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            if (data) {
                setPlayerStats(data.playerStats)    
            }
        })
        .then(message => {
            setSearch("")
        })
        .then(fetch(`/topplayerstats`).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data2 => {
            if (data2) {
                topPlayerStats(data2.playerStats)
                console.log(playerstats2)    
            }
        }))
    }

    return (
        <>
            <h3>Search for player stats here.</h3>
            <Form userInput = {search} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
            <PlayerStatsCard playerStatsList = {playerstats}></PlayerStatsCard>
            --------------------------
            <h3>Top Rated Player for Comparison</h3>
            <PlayerStatsCard playerStatsList = {playerstats2}></PlayerStatsCard>
        </>
    )
}