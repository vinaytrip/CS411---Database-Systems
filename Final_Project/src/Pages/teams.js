import React, {useState, useEffect} from "react";
import {TeamCard} from "../Components/Card/TeamCard";
import {Form} from "../Components/Form/Form";
import {TeamRatingsCard} from "../Components/Card/TeamRatingsCard";

export const Teams = () => {
    const [teams, setTeams] = useState([])
    const [search, setSearch] = useState("")
    const [teamsReviewed, setteamsReviewed] = useState([])

    

    const handleFormChange = (inputValue) => {
        setSearch(inputValue)
    }

    const handleFormSubmit = () => {
        console.log("form submitted")
        fetch(`/searchteams/${search}`).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTeams(data))
        .then(message => {
            setSearch("")
        })

        .then(fetch(`/teamreviewedstats`).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => {
            if (data) {
                setteamsReviewed(data.TeamReview)
                //console.log(playerstats2)
                console.log(teamsReviewed)    
            }
        }))
    }

    // const updateTeams = () => {
    //     fetch("/players/update")
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // }

    // useEffect(() => {
    //     updatePlayers()
    // }, [])

    return (
        <>
            <h3>Search for teams here.</h3>
            <Form userInput = {search} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
            <TeamCard teamList = {teams}></TeamCard>

            ----------------------------------------------------------
            <h3>Top Rated Team</h3>
            <TeamRatingsCard TeamRatingsList = {teamsReviewed}></TeamRatingsCard>
        </>
    )
}