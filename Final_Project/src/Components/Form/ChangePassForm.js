import React, {useState} from "react";

export const ChangePassForm = ({username, password, newpassword, onUserChange, onPassChange, onNewPassChange, onFormSubmit}) => {
    const [successMessage, setSuccessMessage] = useState("")

    const handleUserChange = (event) => {
        onUserChange(event.target.value);
    }

    const handlePassChange = (event) => {
        onPassChange(event.target.value);
    }

    const handleNewPassChange = (event) => {
        onNewPassChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
        setSuccessMessage("Password changed successfully!")
    }

    return(
        <>
            <form onSubmit = {handleSubmit}>
                <h3>Username</h3>
                <input type = "text" required value = {username} onChange = {handleUserChange}></input>
                <br></br>
                <h3>Password</h3>
                <input type = "text" required value = {password} onChange = {handlePassChange}></input>
                <br></br>
                <h3>New Password</h3>
                <input type = "text" required value = {newpassword} onChange = {handleNewPassChange}></input>
                <br></br><br></br>
                <input type = "submit"></input>
                <h4>{successMessage}</h4>
            </form>
        </>
    )
}