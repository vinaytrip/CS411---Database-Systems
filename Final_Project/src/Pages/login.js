import React, {useState, useEffect} from "react";
import {LoginForm} from "../Components/Form/LoginForm";
import {UserPlayerReviewCard} from "../Components/Card/UserReviewPlayerCard";
import {UserTeamReviewCard} from "../Components/Card/UserReviewTeamCard";
import {Link} from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loggedin, setLoggedIn] = useState(false)
    const [loggedinUser, setLoggedInUser] = useState("")
    const [playerReviews, setPlayerReviews] = useState([])
    const [teamReviews, setTeamReviews] = useState([])
    const [loggedinID, setLoggedInID] = useState(-1)
    const [avgRating, setAvgRating] = useState(-1)

    const handleUsernameChange = (inputValue) => {
        setUsername(inputValue)
    }

    const handlePasswordChange = (inputValue) => {
        setPassword(inputValue)
    }

    const handleFormSubmit = () => {
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                username:username,
                password:password
            })
        }).then(response => response.json())
        .then(data => {
            isLoggedIn()
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
                setLoggedInUser("")
                setLoggedInID(-1)
                return false
            } else {
                console.log("true")
                setLoggedIn(true)
                setLoggedInUser(data.username)
                setLoggedInID(data.userID)
                return true
            }
        })
    }

    useEffect(() => {
        isLoggedIn()
    })

    useEffect(() => {
        getPlayerReviews()
        getTeamReviews()
        getAvgUserRating()
    }, [loggedinID])

    const getPlayerReviews = () => {
        if (loggedinID !== -1) {
            fetch(`/user/${loggedinID}/playerreviews`)
            .then(response => response.json())
            .then(data => {
                console.log("get reviews", data)
                setPlayerReviews(data)
            })
        }
    }

    const getTeamReviews = () => {
        if (loggedinID !== -1) {
            fetch(`/user/${loggedinID}/teamreviews`)
            .then(response => response.json())
            .then(data => {
                console.log("get reviews", data)
                setTeamReviews(data)
            })
        }
    }

    const getAvgUserRating = () => {
        if (loggedinID !== -1) {
            fetch(`/user/${loggedinID}/avgrating`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAvgRating(data.avg.avgRating)
            })
        }
    }

    const getLoginForm = () => {
        return (
            <>
                <LoginForm Username = {username} Password = {password} onUsernameChange = {handleUsernameChange} onPasswordChange = {handlePasswordChange} onFormSubmit = {handleFormSubmit}></LoginForm>
            </>
        )
    }

    const getWelcomeMessage = () => {
        return (
            <>
                <h3>Welcome {loggedinUser}</h3>
                <h2>Your Average Rating</h2>
                <h3>{avgRating}</h3>
                <h2>Your Player Reviews</h2>
                <UserPlayerReviewCard reviewList = {playerReviews}></UserPlayerReviewCard>
                <br></br><br></br>
                <h2>Your Team Reviews</h2>
                <UserTeamReviewCard reviewList = {teamReviews}></UserTeamReviewCard>
                <br></br><br></br>
            </>
        )
    }

    const deleteUser = () => {
        
        if (loggedinID !== -1) {
            fetch("/login/deleteuser", {
                method: "POST",
                body: JSON.stringify({
                    username:username,
                    password:password
                })
            })
        }
    }

    return (
        <>
            {
                loggedin ? getWelcomeMessage()
                : getLoginForm()
            }
            {/* <button>Create new account</button> */}
            <Link to ={`/login/createuser`}><button >Create new account</button></Link>
            <br></br><br></br>
            <Link to ={`/login/changepass`}><button>Change password</button></Link>
            {/* <Link to={"/login"}><button onClick={deleteUser}>Delete Account</button></Link> */}
            {/* <button onClick={deleteUser, window.location.reload(false)}>Delete Account</button> */}
            
            <button onClick={() => {
                deleteUser();
                window.location.reload(false);
            }}>Delete Account</button>
        </>
    )
}