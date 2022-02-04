import React, {useState, useEffect} from "react";
import {PlayerCard} from "../Components/Card/PlayerCard";
import {Form} from "../Components/Form/Form";

export const Players = () => {
    const [players, setPlayers] = useState([])
    const [search, setSearch] = useState("")

    const handleFormChange = (inputValue) => {
        setSearch(inputValue)
    }

    const handleFormSubmit = () => {
        console.log("form submitted")
        fetch(`/searchplayers/${search}`).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setPlayers(data))
        .then(message => {
            setSearch("")
        })
    }

    // const updatePlayers = () => {
    //     fetch("/players/update")
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // }

    // useEffect(() => {
    //     updatePlayers()
    // }, [])

    return (
        <>
            <h3>Search for players here.</h3>
            <Form userInput = {search} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
            <PlayerCard playerList = {players}></PlayerCard>
        </>
    )
}