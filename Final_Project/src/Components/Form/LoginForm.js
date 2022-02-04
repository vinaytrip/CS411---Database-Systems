import React, {useState, useEffect} from "react";

export const LoginForm = ({Username, Password, onUsernameChange, onPasswordChange, onFormSubmit}) => {

    const handleUsernameChange = (event) => {
        onUsernameChange(event.target.value);
    }

    const handlePasswordChange = (event) => {
        onPasswordChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    }

    return(
        <>
            <form onSubmit = {handleSubmit}>
                <h3>Your username</h3>
                <input type = "text" required value = {Username} onChange = {handleUsernameChange}></input>
                <br></br>
                <h3>Your password</h3>
                <input type = "text" required value = {Password} onChange = {handlePasswordChange}></input>
                <br></br><br></br>
                <input type = "submit"></input>
                <br></br><br></br>
            </form>
        </>
    )
}