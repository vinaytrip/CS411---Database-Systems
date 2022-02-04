""" Specifies routing for the application"""
from flask import render_template, request, jsonify, json
from app import app
from app import database as db_helper

@app.route("/searchplayers/<search>")
def searchPlayers(search):
    return db_helper.search_players(search)

@app.route("/players/<int:id>")
def getPlayer(id):
    return db_helper.get_player(id)

@app.route("/players/update")
def updatePlayersDB():
    return db_helper.update_players_db()

@app.route("/players/<int:id>/reviews")
def getPlayerReviews(id):
    return db_helper.get_player_reviews(id)

@app.route("/players/addreview", methods = ["POST"])
def addPlayerReview():
    request_data = json.loads(request.data)
    return db_helper.add_player_review(request_data)

@app.route("/teams/<int:id>")
def getTeam(id):
    return db_helper.get_team(id)

@app.route("/searchteams/<search>")
def searchTeams(search):
    return db_helper.search_teams(search)

@app.route("/login", methods = ["POST"])
def login():
    request_data = json.loads(request.data)
    print(request_data)
    return db_helper.login(request_data["username"], request_data["password"])

@app.route("/login/createuser", methods = ["POST"])
def createuser():
    request_data = json.loads(request.data)
    print(request_data)
    return db_helper.create_user(request_data["username"], request_data["password"])

@app.route("/login/deleteuser", methods = ["POST"])
def deleteuser():
    request_data = json.loads(request.data)
    print(request_data)
    return db_helper.delete_user(request_data["username"], request_data["password"])

@app.route("/login/changepass", methods = ["POST"])
def changepass():
    request_data = json.loads(request.data)
    print(request_data)
    return db_helper.change_pass(request_data["username"], request_data["password"], request_data["newpassword"])

@app.route("/loggedin")
def loggedin():
    return db_helper.isLoggedIn()

@app.route("/user/<int:id>/playerreviews")
def getUserReviews(id):
    return db_helper.get_user_player_reviews(id)

@app.route("/players/editreview", methods = ["POST"])
def editPlayerReview():
    request_data = json.loads(request.data)
    return db_helper.update_player_review(request_data)

@app.route("/players/deletereview", methods = ["POST"])
def deletePlayerReview():
    request_data = json.loads(request.data)
    return db_helper.delete_player_review(request_data["id"])

@app.route("/players/addplayer", methods = ["POST"])
def addPlayer():
    request_data = json.loads(request.data)
    return db_helper.add_player(request_data)

@app.route("/players/editplayer", methods = ["POST"])
def editPlayer():
    request_data = json.loads(request.data)
    return db_helper.edit_player(request_data)

@app.route("/players/deleteplayer", methods = ["POST"])
def deletePlayer():
    request_data = json.loads(request.data)
    return db_helper.delete_player(request_data["id"])

@app.route("/teams/addteam", methods = ["POST"])
def addTeam():
    request_data = json.loads(request.data)
    return db_helper.add_team(request_data)

@app.route("/teams/editteam", methods = ["POST"])
def editTeam():
    request_data = json.loads(request.data)
    return db_helper.edit_team(request_data)

@app.route("/teams/deleteteam", methods = ["POST"])
def deleteTeam():
    request_data = json.loads(request.data)
    return db_helper.delete_team(request_data["id"])

@app.route("/teams/<int:id>/reviews")
def getTeamReviews(id):
    return db_helper.get_team_reviews(id)

@app.route("/teams/addreview", methods = ["POST"])
def addTeamReview():
    request_data = json.loads(request.data)
    return db_helper.add_team_review(request_data)

@app.route("/user/<int:id>/teamreviews")
def getUserTeamReviews(id):
    return db_helper.get_user_team_reviews(id)

@app.route("/teams/editreview", methods = ["POST"])
def editTeamReview():
    request_data = json.loads(request.data)
    return db_helper.update_team_review(request_data)

@app.route("/teams/deletereview", methods = ["POST"])
def deleteTeamReview():
    request_data = json.loads(request.data)
    return db_helper.delete_team_review(request_data["id"])

@app.route("/user/<int:id>/avgrating")
def getAvgUserRating(id):
    return db_helper.get_user_rating_avg(id)

#player stats stuff
@app.route("/playerStats/<int:id>")
def getStats(id):
    return db_helper.get_player_stats(id)

@app.route("/playerStats/addplayerstats", methods = ["POST"])
def addStats():
    request_data = json.loads(request.data)
    return db_helper.add_player_stats(request_data)

@app.route("/playerStats/editplayerstats", methods = ["POST"])
def editStats():
    request_data = json.loads(request.data)
    return db_helper.update_player_stats(request_data)

@app.route("/playerStats/deleteplayerstats", methods = ["POST"])
def deleteStats():
    request_data = json.loads(request.data)
    return db_helper.delete_player_stats(request_data["id"])

@app.route("/searchplayerstats/<search>")
def searchPlayerStats(search):
    return db_helper.search_player_stats(search)

@app.route("/topplayerstats")
def topplayerstats():
    return db_helper.top_player_stats()

@app.route("/teams/numplayers")
def getNumPlayersTeam():
    return db_helper.get_num_players_team()

@app.route("/searchplayerreviews/<search>")
def searchPlayerReviews(search):
    return db_helper.search_player_reviews(search)

@app.route("/searchteamreviews/<search>")
def searchTeamReviews(search):
    return db_helper.search_team_reviews(search)

@app.route("/teamreviewedstats")
def teamreviewedstats():
    return db_helper.team_reviewed_stats()
