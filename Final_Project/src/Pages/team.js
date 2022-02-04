import React, {useState, useEffect} from "react";
import {PlayerCard} from "../Components/Card/PlayerCard";
import {Form} from "../Components/Form/Form";
import {TeamInfo} from "../Components/Info/teamInfo"
import {TeamReviewCard} from "../Components/Card/TeamReviewCard"
import {
    useParams,
    Link
} from "react-router-dom";

export const Team = ({teamInfo}) => {
    const {id} = useParams()
    const [team, setTeam] = useState([])
    const [reviews, setReviews] = useState([])

    const getTeam = () => {
        fetch(`/teams/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.team)
            setTeam(data.team)
            getReviews()
        })
    }

    const getReviews = () => {
        fetch(`/teams/${id}/reviews`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setReviews(data)
        })
    }

    useEffect(() => {
        getTeam()
    }, [id])

    return (
        <>
            <TeamInfo teamInfo = {team}></TeamInfo>
            <br></br><br></br>
            <Link to ={`/teams/${id}/addreview`}><button >Add Review</button></Link>
            <br></br><br></br>
            <h2>Reviews</h2>
            <TeamReviewCard reviewList = {reviews}></TeamReviewCard>
        </>
    )
}