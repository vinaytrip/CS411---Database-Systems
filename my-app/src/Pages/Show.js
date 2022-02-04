import React, {useState, useEffect} from "react";
import {Delete} from "../Components/Delete/delete"
import {Edit} from "../Components/Edit/edit"
import {
    useParams,
    Link
} from "react-router-dom";

export const Show = () => {
    const {id} = useParams()
    const [todo, setTodo] = useState([])

    const getLatestEdit = () => {
        fetch(`/api/${id}`)
        .then(response => response.json())
        .then(data => setTodo(data))
    }

    useEffect(() => {
        getLatestEdit()
    }, [id])

    return(
        <div>
            {todo.length > 0 && todo.map(data => <div key = {data.id}>{data.content}</div>)}
            <Edit id = {id} onEdit = {getLatestEdit}></Edit>
            <br></br>
            <Delete id = {id}></Delete>
            <hr></hr>
            <Link to="/">Back to todos</Link>
        </div>
    )
}