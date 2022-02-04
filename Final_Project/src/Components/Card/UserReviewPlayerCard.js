import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const UserPlayerReviewCard = ({reviewList}) => {
    console.log(reviewList)
    return (
        <>
            {reviewList.map(review => {
                return (
                    <>
                    <h3>Review #{review.id} {review.playerName} - {review.playerRating}/100</h3>
                    <h4>{review.playerReview}</h4>
                    <Link to = {`players/editreview/${review.id}`}><button>Edit/Delete</button></Link>
                    </>
                )
            })}
        </>
    )
}