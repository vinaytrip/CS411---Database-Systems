import React, {useState, useEffect} from "react";
import {PlayerCard} from "../Components/Card/PlayerCard";
import {Form} from "../Components/Form/Form";
import {PlayerInfo} from "../Components/Info/playerInfo"
import {PlayerReviewCard} from "../Components/Card/PlayerReviewCard"
import {
    useParams,
    Link
} from "react-router-dom";

export const Player = ({playerInfo}) => {
    const {id} = useParams()
    const [player, setPlayer] = useState([])
    const [reviews, setReviews] = useState([])

    const getPlayer = () => {
        fetch(`/players/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPlayer(data.player)
            getReviews()
        })
    }

    const getReviews = () => {
        fetch(`/players/${id}/reviews`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setReviews(data)
        })
    }

    useEffect(() => {
        getPlayer()
    }, [id])

    return (
        <>
            <PlayerInfo playerInfo = {player}></PlayerInfo>
            <br></br><br></br>
            <Link to ={`/players/${id}/addreview`}><button >Add Review</button></Link>
            <br></br><br></br>
            <h2>Reviews</h2>
            <PlayerReviewCard reviewList = {reviews}></PlayerReviewCard>
        </>
    )
}