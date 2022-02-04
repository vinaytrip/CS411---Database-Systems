import React, {useState} from "react"
import {Form} from "../Form/form";

export const Edit = ({id, onEdit}) => {
    const [editTodo, setEditTodo] = useState("")

    const handleFormChange = (inputValue) => {
        setEditTodo(inputValue);
    }

    const handleFormSubmit = () => {
        fetch(`/api/edit/${id}`, {
            method: "POST",
            body: JSON.stringify({
                id:id,
                content:editTodo
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            onEdit()
        })
    }
    return (
        <>
            <p>Edit:</p>
            <Form userInput = {editTodo} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
        </>
    )
}