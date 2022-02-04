import React, {useState} from "react";
import {CreateUserForm} from "../Components/Form/CreateUserForm";
import {useHistory} from "react-router-dom";

export const CreateUser = () => {
    const history = useHistory()
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")

    const handleUserChange = (inputValue) => {
        setUsername(inputValue)
    }

    const handlePassChange = (inputValue) => {
        setPassword(inputValue)
    }

    const handleFormSubmit = () => {
        fetch("/login/createuser", {
            method: "POST",
            body: JSON.stringify({
                username:username,
                password:password
            })
        }).then(response => response.json())
        .then(data => {
            history.push("/login")
        })
    }

    return (
        <>     
            <h3>Create New Account</h3>
            <CreateUserForm Username = {username} Password = {password} onUserChange = {handleUserChange} onPassChange = {handlePassChange} onFormSubmit = {handleFormSubmit}></CreateUserForm>
        </>
    )
}