import React, {useState, useEffect} from "react";
import {PlayerCard} from "../Components/Card/PlayerCard";
import {ReviewForm} from "../Components/Form/ReviewForm";
import {
    useParams,
    Link,
    useHistory
} from "react-router-dom";

export const PlayerReview = () => {
    const history = useHistory()
    const {id} = useParams()
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")
    const [loggedin, setLoggedIn] = useState(false)
    const [loggedinID, setLoggedInID] = useState(-1)

    const handleRatingChange = (inputValue) => {
        setRating(inputValue)
    }

    const handleReviewChange = (inputValue) => {
        setReview(inputValue)
    }

    const handleFormSubmit = () => {
        fetch("/players/addreview", {
            method: "POST",
            body: JSON.stringify({
                playerID:id,
                userID:loggedinID,
                rating:rating,
                review:review
            })
        }).then(response => response.json())
        .then(data => {
            history.push(`/players/${id}`)
        })
    }

    const isLoggedIn = () => {
        fetch("/loggedin").then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            if (data.userID == null) {
                console.log("false")
                setLoggedIn(false)
                setLoggedInID(-1)
                return false
            } else {
                console.log("true")
                setLoggedIn(true)
                setLoggedInID(data.userID)
                return true
            }
        })
    }

    useEffect(() => {
        isLoggedIn()
    })
    
    return (
        <>
            {
                loggedin ?
                <>
                <h3>Add Review for this player</h3>
                <ReviewForm Rating = {rating} Review = {review} onRatingChange = {handleRatingChange} onReviewChange = {handleReviewChange} onFormSubmit = {handleFormSubmit}></ReviewForm>
                </>
                :
                <>
                <h3>You must be logged in to submit a review</h3>
                </>
            }
            
        </>
    )
}