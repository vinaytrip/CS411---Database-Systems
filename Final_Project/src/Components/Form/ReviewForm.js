import React, {useState, useEffect} from "react";

export const ReviewForm = ({Rating, Review, onRatingChange, onReviewChange, onFormSubmit}) => {
    const [successMessage, setSuccessMessage] = useState("")

    const handleRatingChange = (event) => {
        onRatingChange(event.target.value);
    }

    const handleReviewChange = (event) => {
        onReviewChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
        setSuccessMessage("Review submitted successfully!")
    }

    return(
        <>
            <form onSubmit = {handleSubmit}>
                <h3>Your rating</h3>
                <input type = "number" min = "0" max = "100" required value = {Rating} onChange = {handleRatingChange}></input>
                <br></br>
                <h3>Your review</h3>
                <input type = "text" required value = {Review} onChange = {handleReviewChange}></input>
                <br></br><br></br>
                <input type = "submit"></input>
                <h4>{successMessage}</h4>
            </form>
        </>
    )
}