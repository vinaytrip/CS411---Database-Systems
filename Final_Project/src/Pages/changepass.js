import React, {useState} from "react";
import {ChangePassForm} from "../Components/Form/ChangePassForm";
import {useHistory} from "react-router-dom";

export const ChangePass = () => {
    const history = useHistory()
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[newpassword, setNewPassword] = useState("")


    const handleUserChange = (inputValue) => {
        setUsername(inputValue)
    }

    const handlePassChange = (inputValue) => {
        setPassword(inputValue)
    }

    const handleNewPassChange = (inputValue) => {
        setNewPassword(inputValue)
    }

    const handleFormSubmit = () => {
        fetch("/login/changepass", {
            method: "POST",
            body: JSON.stringify({
                username:username,
                password:password,
                newpassword:newpassword
            })
        }).then(response => response.json())
        .then(data => {
            history.push("/login")
        })
    }

    return (
        <>     
            <h3>Change Password</h3>
            <ChangePassForm Username = {username} Password = {password} NewPassword = {newpassword} onUserChange = {handleUserChange} onPassChange = {handlePassChange} onNewPassChange = {handleNewPassChange} onFormSubmit = {handleFormSubmit}></ChangePassForm>
        </>
    )
}