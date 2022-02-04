import React, {useState, useEffect} from "react";
import {PlayerCard} from "../Components/Card/PlayerCard";
import {ReviewForm} from "../Components/Form/ReviewForm";
import {
    useParams,
    Link,
    useHistory
} from "react-router-dom";

export const TeamReviewEdit = () => {
    const history = useHistory()
    const {id} = useParams()
    const [rating, setRating] = useState(-1)
    const [review, setReview] = useState("")

    const handleRatingChange = (inputValue) => {
        setRating(inputValue)
    }

    const handleReviewChange = (inputValue) => {
        setReview(inputValue)
    }

    const handleFormSubmit = () => {
        console.log(id)
        fetch("/teams/editreview", {
            method: "POST",
            body: JSON.stringify({
                reviewID:id,
                rating:rating,
                review:review
            })
        }).then(response => response.json())
        .then(data => {
            history.push("/login")
        })
    }

    const deleteReview = () => {
        fetch("/teams/deletereview", {
            method: "POST",
            body: JSON.stringify({
                id:id,
            })
        }).then(response => response.json())
        .then(data => {
            history.push("/login")
        })
    }
    return (
        <>     
            <h3>Edit Review</h3>
            <ReviewForm Rating = {rating} Review = {review} onRatingChange = {handleRatingChange} onReviewChange = {handleReviewChange} onFormSubmit = {handleFormSubmit}></ReviewForm>
            <br></br><br></br>
            <button onClick = {deleteReview}>Delete Review</button>
        </>
    )
}