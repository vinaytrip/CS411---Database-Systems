import React, {useState, useEffect} from "react";
import {CRUDPlayersForm} from "../Components/Form/CRUDPlayerForm";
import {CRUDTeamForm} from "../Components/Form/CRUDTeamForm";
import {CRUDPlayerStatsForm} from "../Components/Form/CRUDPlayerStatsForm";
import {PlayerReviewCard} from "../Components/Card/PlayerReviewCard"
import {TeamReviewCard} from "../Components/Card/TeamReviewCard"
import {Form} from "../Components/Form/Form";
import {
    useParams,
    Link
} from "react-router-dom";

export const CRUDPlayersTeams = () => {
    const [playerID, setPlayerID] = useState(-1)
    const [playerName, setPlayerName] = useState("")
    const [playerPos, setPlayerPos] = useState("")
    const [playerTeamID, setPlayerTeamID] = useState(-1)
    const [playerCountry, setPlayerCountry] = useState("")
    const [playerSchool, setPlayerSchool] = useState("")

    //player stats here
    const [statsID, setStatsID] = useState(-1)
    const [timeframe, setTimeFrame] = useState("")
    const [PTS, setPTS] = useState("")
    const [AST, setAST] = useState(-1)
    const [REB, setREB] = useState("")
    const [PIE, setPIE] = useState("")


    const [teamID, setTeamID] = useState(-1)
    const [teamName, setTeamName] = useState("")
    const [teamCity, setTeamCity] = useState("")

    const [numPlayers, setNumPlayers] = useState([])

    const [playerReviews, setPlayerReviews] = useState([])
    const [playerReviewSearch, setPlayerReviewSearch] = useState("")

    const [teamReviews, setTeamReviews] = useState([])
    const [teamReviewSearch, setTeamReviewSearch] = useState("")

    const handlePlayerIDChange = (inputValue) => {
        setPlayerID(inputValue)
    }

    const handlePlayerNameChange = (inputValue) => {
        setPlayerName(inputValue)
    }

    const handlePlayerPosChange = (inputValue) => {
        setPlayerPos(inputValue)
    }

    const handlePlayerTeamIDChange = (inputValue) => {
        setPlayerTeamID(inputValue)
    }

    const handlePlayerCountryChange = (inputValue) => {
        setPlayerCountry(inputValue)
    }

    const handlePlayerSchoolChange = (inputValue) => {
        setPlayerSchool(inputValue)
    }

    const handlePlayerAdd = () => {
        fetch("/players/addplayer", {
            method: "POST",
            body: JSON.stringify({
                playerID:playerID,
                name:playerName,
                position:playerPos,
                teamID:playerTeamID,
                country:playerCountry,
                school:playerSchool
            })
        })
    }

    const handlePlayerEdit = () => {
        fetch("/players/editplayer", {
            method: "POST",
            body: JSON.stringify({
                playerID:playerID,
                name:playerName,
                position:playerPos,
                teamID:playerTeamID,
                country:playerCountry,
                school:playerSchool
            })
        })
    }

    const handlePlayerDelete = () => {
        fetch("/players/deleteplayer", {
            method: "POST",
            body: JSON.stringify({
                id:playerID
            })
        })
    }

    const handleTeamIDChange = (inputValue) => {
        setTeamID(inputValue)
    }

    const handleTeamNameChange = (inputValue) => {
        setTeamName(inputValue)
    }

    const handleTeamCityChange = (inputValue) => {
        setTeamCity(inputValue)
    }

    const handleTeamAdd = () => {
        fetch("/teams/addteam", {
            method: "POST",
            body: JSON.stringify({
                teamID:teamID,
                teamName:teamName,
                teamCity:teamCity
            })
        })
    }

    const handleTeamEdit = () => {
        fetch("/teams/editteam", {
            method: "POST",
            body: JSON.stringify({
                teamID:teamID,
                teamName:teamName,
                teamCity:teamCity
            })
        })
    }

    const handleTeamDelete = () => {
        fetch("/teams/deleteteam", {
            method: "POST",
            body: JSON.stringify({
                id:teamID
            })
        })
    }

    //player stats
    const handleStatsIDChange = (inputValue) => {
        setStatsID(inputValue)
    }

    const handleTimeFrameChange = (inputValue) => {
        setTimeFrame(inputValue)
    }

    const handlePTSChange = (inputValue) => {
        setPTS(inputValue)
    }

    const handleASTChange = (inputValue) => {
        setAST(inputValue)
    }

    const handleREBChange = (inputValue) => {
        setREB(inputValue)
    }

    const handlePIEChange = (inputValue) => {
        setPIE(inputValue)
    }

    const handlePlayerStatsAdd = () => {
        fetch("/playerStats/addplayerstats", {
            method: "POST",
            body: JSON.stringify({
                statsID:statsID,
                timeframe:timeframe,
                PTS:PTS,
                AST:AST,
                REB:REB,
                PIE:REB,
                playerID:playerID
            })
        })
    }

    const handlePlayerStatsEdit = () => {
        fetch("/playerStats/editplayerstats", {
            method: "POST",
            body: JSON.stringify({
                statsID:statsID,
                timeframe:timeframe,
                PTS:PTS,
                AST:AST,
                REB:REB,
                PIE:REB,
                playerID:playerID
            })
        })
    }

    const handlePlayerStatsDelete = () => {
        fetch("/playerStats/deleteplayerstats", {
            method: "POST",
            body: JSON.stringify({
                id:statsID
            })
        })
    }

    const getNumPlayersTeam = () => {
        fetch("/teams/numplayers")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setNumPlayers(data)
        })
    }

    const handlePlayerReviewFormChange = (inputValue) => {
        setPlayerReviewSearch(inputValue)
    }

    const handlePlayerReviewFormSubmit = () => {
        console.log("form submitted")
        fetch(`/searchplayerreviews/${playerReviewSearch}`).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setPlayerReviews(data))
        .then(message => {
            setPlayerReviewSearch("")
        })
    }

    const handleTeamReviewFormChange = (inputValue) => {
        setTeamReviewSearch(inputValue)
    }

    const handleTeamReviewFormSubmit = () => {
        console.log("form submitted")
        fetch(`/searchteamreviews/${teamReviewSearch}`).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTeamReviews(data))
        .then(message => {
            setTeamReviewSearch("")
        })
    }
    
    return (
        <>
        <h2>This page is for the 4/12 demo. Delete it later.</h2>
            <CRUDPlayersForm playerID = {playerID} playerName = {playerName} playerPos = {playerPos} 
                playerTeamID = {playerTeamID} playerCountry = {playerCountry} playerSchool = {playerSchool} 
                onPlayerIDChange = {handlePlayerIDChange} onPlayerNameChange = {handlePlayerNameChange}
                onPlayerPosChange = {handlePlayerPosChange} onPlayerTeamIDChange = {handlePlayerTeamIDChange}
                onPlayerCountryChange = {handlePlayerCountryChange} onPlayerSchoolChange = {handlePlayerSchoolChange}
                onAdd = {handlePlayerAdd} onEdit = {handlePlayerEdit} onDelete = {handlePlayerDelete}></CRUDPlayersForm>
                <br></br><br></br>
            <CRUDTeamForm teamID = {teamID} teamName = {teamName} teamCity = {teamCity}
            onTeamIDChange = {handleTeamIDChange} onTeamNameChange = {handleTeamNameChange} onTeamCityChange = {handleTeamCityChange}
            onAdd = {handleTeamAdd} onEdit = {handleTeamEdit} onDelete = {handleTeamDelete}></CRUDTeamForm>
            <CRUDPlayerStatsForm statsID = {statsID} timeframe = {timeframe} PTS = {PTS} 
                AST = {AST} REB = {REB} PIE = {PIE} playerID = {playerID} 
                onStatsIDChange = {handleStatsIDChange} onTimeFrameChange = {handleTimeFrameChange}
                onPTSChange = {handlePTSChange} onASTChange = {handleASTChange}
                onREBChange = {handleREBChange} onPIEChange = {handlePIEChange}
                onPlayerIDChange = {handlePlayerIDChange}
                onAdd = {handlePlayerStatsAdd} onEdit = {handlePlayerStatsEdit} onDelete = {handlePlayerStatsDelete}></CRUDPlayerStatsForm>
                <br></br><br></br>
            <button onClick = {getNumPlayersTeam}>Get number of players per team</button>
            {numPlayers.map(row => {
                return (
                    <ul key = {row.teamName}>
                        <li>{row.teamName} - {row.numPlayers}</li>
                    </ul>
                )
            })}
            <h3>Search Player Reviews here by keyword</h3>
            <br></br>
            <Form userInput = {playerReviewSearch} onFormChange = {handlePlayerReviewFormChange} onFormSubmit = {handlePlayerReviewFormSubmit}/>
            <PlayerReviewCard reviewList = {playerReviews}></PlayerReviewCard>
            <h3>Search Team Reviews here by keyword</h3>
            <br></br>
            <Form userInput = {teamReviewSearch} onFormChange = {handleTeamReviewFormChange} onFormSubmit = {handleTeamReviewFormSubmit}/>
            <TeamReviewCard reviewList = {teamReviews}></TeamReviewCard>
        </>
        
    )
}