import React from "react";
import "../../App.css"
import {Link} from "react-router-dom"

export const Nav = () => {
    const navStyle = {
        color:"white"
    }
    return (
        <nav>
            <h3>NBA App</h3>
            <ul className = "nav-links">
                <Link to = "/" style = {navStyle}><li>Home</li></Link>
                <Link to = "/players" style = {navStyle}><li>Players</li></Link>
                <Link to = "/playerstats" style = {navStyle}><li>Player Stats</li></Link>
                <Link to = "/teams" style = {navStyle}><li>Teams</li></Link>
                <Link to = "/login" style = {navStyle}><li>Login/Create Account</li></Link>
            </ul>
        </nav>
    )
}