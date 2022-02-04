import React from "react";
import logo from './logo.svg';
import {Nav} from "./Components/Nav/Nav";
import {Home} from "./Pages/Home"
import {Players} from "./Pages/players"
import {Player} from "./Pages/player"
import {Teams} from "./Pages/teams"
import {Team} from "./Pages/team"
import {Login} from "./Pages/login"
import {CreateUser} from "./Pages/createuser"
import {ChangePass} from "./Pages/changepass"
import {PlayerReview} from "./Pages/playerReview"
import {PlayerReviewEdit} from "./Pages/playerReviewEdit"
import {CRUDPlayersTeams} from "./Pages/CRUDPlayersTeams"
import {TeamReview} from "./Pages/teamReview"
import {TeamReviewEdit} from "./Pages/teamReviewEdit"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { PlayerStats } from "./Pages/playerStats";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Route exact path = "/" component = {Home}></Route>
        <Route exact path = "/players" component = {Players}></Route>
        <Route exact path = "/players/:id" component = {Player}></Route>
        <Route exact path = "/playerStats" component = {PlayerStats}></Route>
        <Route exact path = "/playerStats/:id" component = {PlayerStats}></Route>
        <Route exact path = "/teams" component = {Teams}></Route>
        <Route exact path = "/teams/:id" component = {Team}></Route>
        <Route exact path = "/login" component = {Login}></Route>
        <Route exact path = "/login/changepass" component = {ChangePass}></Route>
        <Route exact path = "/login/createuser" component = {CreateUser}></Route>
        <Route exact path = "/players/:id/addreview" component = {PlayerReview}></Route>
        <Route exact path = "/players/editreview/:id" component = {PlayerReviewEdit}></Route>
        <Route exact path = "/crudplayersteams" component = {CRUDPlayersTeams}></Route>
        <Route exact path = "/teams/:id/addreview" component = {TeamReview}></Route>
        <Route exact path = "/teams/editreview/:id" component = {TeamReviewEdit}></Route>
      </div>
    </Router>
  );
}

export default App;
