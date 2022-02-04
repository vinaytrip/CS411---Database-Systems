import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const TeamReviewCard = ({reviewList}) => {
    console.log(reviewList)
    return (
        <>
            {reviewList.map(review => {
                return (
                    <>
                    <h3>{review.username} - {review.teamRating}/100</h3>
                    <h4>{review.teamReview}</h4>
                    </>
                )
            })}
        </>
    )
}