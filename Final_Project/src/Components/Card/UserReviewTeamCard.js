import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const UserTeamReviewCard = ({reviewList}) => {
    console.log(reviewList)
    return (
        <>
            {reviewList.map(review => {
                return (
                    <>
                    <h3>Review #{review.id} {review.teamName} - {review.teamRating}/100</h3>
                    <h4>{review.teamReview}</h4>
                    <Link to = {`teams/editreview/${review.id}`}><button>Edit/Delete</button></Link>
                    </>
                )
            })}
        </>
    )
}