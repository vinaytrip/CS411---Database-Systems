from flask import Flask, jsonify, request, json
from app import db
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static import players
import pandas as pd
import time
from newsapi import NewsApiClient

user = {"userID":None, "username":None}

def player_serializer(player):
    return {
        "id":player["playerID"],
        "name":player["name"]
    } 

def player_stats_serializer(playerStats):
    return {
        "id":playerStats["statsID"],
        "PTS":playerStats["PTS"],
        "AST":playerStats["AST"],
        "REB":playerStats["REB"],
        "PIE":playerStats["PIE"]
    } 

def team_serializer(player):
    return {
        "id":player["teamID"],
        "name":player["teamName"]
    } 

def player_review_serializer(review):
    return {
        "id":review["playerReviewID"],
        "username":review["username"],
        "playerRating":review["playerRating"],
        "playerReview":review["playerReview"]
    } 

def user_player_review_serializer(review):
    return {
        "id":review["playerReviewID"],
        "playerName":review["name"],
        "playerRating":review["playerRating"],
        "playerReview":review["playerReview"]
    }

def user_team_review_serializer(review):
    return {
        "id":review["teamReviewID"],
        "teamName":review["teamName"],
        "teamRating":review["teamRating"],
        "teamReview":review["teamReview"]
    }

def team_review_serializer(review):
    return {
        "id":review["teamReviewID"],
        "username":review["username"],
        "teamRating":review["teamRating"],
        "teamReview":review["teamReview"]
    }

def num_players_team_serializer(row):
    return {
        "teamName":row["teamName"],
        "numPlayers":row["numPlayers"]
    }

def login(username, password):
    conn = db.connect()
    password = password + "%"
    query_results = conn.execute("SELECT * FROM user WHERE Username = %s AND Password LIKE %s LIMIT 1;", [username, password]).fetchall()
    print(query_results)
    if (len(query_results) == 0):
        return jsonify({"status":"failed"})
    user["userID"] = query_results[0][0]
    user["username"] = query_results[0][1]
    print(user)
    return jsonify({"status":"ok"})

def isLoggedIn():
    return jsonify(user)

# check user exists already?
def create_user(username, password):
    conn = db.connect()
    conn.execute("INSERT INTO user (username, password) VALUES (%s, %s)", [username, password])
    return jsonify({"status":"ok"})

    # conn = db.connect()
    # query_results = conn.execute("SELECT * FROM user WHERE Username = %s AND Password LIKE %s LIMIT 1;", [username, password]).fetchall()
    # print(query_results)
    # if (len(query_results) != 0):
    #     return jsonify({"status":"failed"})
    
    # conn.execute("INSERT INTO user (username, password) VALUES (%s, %s)", 
    #     [username, password])
    
    # password = password + "%"
    # query_results = conn.execute("SELECT * FROM user WHERE Username = %s AND Password LIKE %s LIMIT 1;", [username, password]).fetchall()
    # print(query_results)
    # if (len(query_results) != 0):
    #     return jsonify({"status":"failed"})
    # user["userID"] = query_results[0][0]
    # user["username"] = query_results[0][1]
    # print(user)
    # return jsonify({"status":"ok"})

# check user exists?
def delete_user(username, password):
    conn = db.connect()
    conn.execute("DELETE FROM user WHERE userID = %s;", [user["userID"]])
    user["userID"] = None
    user["username"] = None
    return jsonify({"status":"ok"})

# need to check correct old password later
def change_pass(username, password, newpassword):
    conn = db.connect()
    conn.execute("UPDATE user SET password = %s WHERE userID = %s;", [newpassword, user["userID"]])
    return jsonify({"status":"ok"})

def search_players(search):
    conn = db.connect()
    search_string = "%" + search + "%"
    query_results = conn.execute("SELECT * FROM players WHERE name LIKE %s LIMIT 50;", [search_string]).fetchall()
    conn.close()
    return jsonify([*map(player_serializer, [dict(row) for row in query_results])])

def search_player_stats(search):
    conn = db.connect()
    search_string = "%" + search + "%"
    query_results = conn.execute("SELECT * FROM player_stats NATURAL JOIN players WHERE name LIKE %s LIMIT 50;", [search_string]).fetchall()
    conn.close()
    if(len(query_results) > 0):
        return jsonify({"playerStats": dict(query_results[0])})
    return "Does not exist"

def get_player(id):
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM players NATURAL JOIN teams WHERE playerID = %s LIMIT 1;", [id]).fetchall()
    conn.close()
    return jsonify({"player": dict(query_results[0])})

def update_players_db():
    plist = players.get_players()
    id_list = set([player["id"] for player in plist])
    conn = db.connect()
    query_results = conn.execute("SELECT playerID FROM players;").fetchall()
    db_ids = set([item[0] for item in query_results])
    id_diff = id_list - db_ids
    print(id_diff)
    print("test")
    i = 0
    for id in id_diff:
        try:
            if (i > 0):
                # only inserting up to 1 row because request might time out otherwise
                return jsonify({"status":"OK"})
            i += 1
            player_info = commonplayerinfo.CommonPlayerInfo(player_id=id)
            info = player_info.common_player_info.get_data_frame()
            headlines = player_info.player_headline_stats.get_data_frame()
            combined = pd.concat([info, headlines], axis = 1, join = "inner")
            combined = combined[["PERSON_ID","DISPLAY_FIRST_LAST","POSITION","TEAM_ID", "COUNTRY", "SCHOOL"]]
            combined = list(combined.iloc[0])
            print(f"attempting to insert {combined}")
            if (not isinstance(combined[-1], str)):
                combined[-1] = None
            sql = "INSERT INTO players VALUES (%s, %s, %s, %s, %s, %s)"
            try:
                conn.execute(sql, tuple(combined))
                print("insert into player database completed", id)
            except Exception as e:
                print(e)
            db.commit()
        except Exception as e:
            print(e)
        time.sleep(0.6)

    conn.close()
    return jsonify({"status":"OK"})

def get_team(id):
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM teams WHERE teamID = %s LIMIT 1;", [id]).fetchall()
    conn.close()
    return jsonify({"team": dict(query_results[0])})

def search_teams(search):
    conn = db.connect()
    search_string = "%" + search + "%"
    query_results = conn.execute("SELECT * FROM teams WHERE teamName LIKE %s LIMIT 50;", [search_string]).fetchall()
    conn.close()
    return jsonify([*map(team_serializer, [dict(row) for row in query_results])])

def get_player_reviews(id):
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM playerReview NATURAL JOIN user WHERE playerReview.playerID = %s", [id]).fetchall()
    conn.close()
    return jsonify([*map(player_review_serializer, [dict(row) for row in query_results])])

def add_player_review(data):   
    conn = db.connect()
    conn.execute("INSERT INTO playerReview (userID, playerRating, playerReview, playerID) VALUES (%s, %s, %s, %s)", 
        [data["userID"], data["rating"], data["review"], data["playerID"]])
    return jsonify({"status":"OK"})

def get_user_player_reviews(id):
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM players NATURAL JOIN playerReview WHERE playerReview.userID = %s", [id]).fetchall()
    conn.close()
    return jsonify([*map(user_player_review_serializer, [dict(row) for row in query_results])])

def update_player_review(data):
    conn = db.connect()
    print(data)
    conn.execute("UPDATE playerReview SET playerRating = %s, playerReview = %s WHERE playerReviewID = %s", 
        [data["rating"], data["review"], data["reviewID"]])
    conn.close()
    return jsonify({"status":"OK"})

def delete_player_review(id):
    conn = db.connect()
    conn.execute("DELETE FROM playerReview WHERE playerReviewID = %s",[id])
    conn.close()
    return jsonify({"status":"OK"})

def add_player(data):
    conn = db.connect()
    conn.execute("INSERT INTO players (playerID, name, position, teamID, country, SCHOOL) VALUES (%s, %s, %s, %s, %s, %s)", 
        [data["playerID"], data["name"], data["position"], data["teamID"], data["country"], data["school"]])
    conn.close()
    return jsonify({"status":"OK"})

def edit_player(data):
    conn = db.connect()
    conn.execute("UPDATE players SET name = %s, position = %s, teamID = %s, country = %s, SCHOOL = %s WHERE playerID = %s", 
        [data["name"], data["position"], data["teamID"], data["country"], data["school"], data["playerID"]])
    conn.close()
    return jsonify({"status":"OK"})

def delete_player(id):
    conn = db.connect()
    conn.execute("DELETE FROM players WHERE playerID = %s", [id])
    conn.close()
    return jsonify({"status":"OK"})

def add_team(data):
    conn = db.connect()
    conn.execute("INSERT INTO teams (teamID, teamName, teamCity) VALUES (%s, %s, %s)", 
        [data["teamID"], data["teamName"], data["teamCity"]])
    conn.close()
    return jsonify({"status":"OK"})

def edit_team(data):
    conn = db.connect()
    conn.execute("UPDATE teams SET teamName = %s, teamCity = %s WHERE teamID = %s", 
        [data["teamName"], data["teamCity"], data["teamID"]])
    conn.close()
    return jsonify({"status":"OK"})

def delete_team(id):
    conn = db.connect()
    conn.execute("DELETE FROM teams WHERE teamID = %s", [id])
    conn.close()
    return jsonify({"status":"OK"})

def get_team_reviews(id):
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM teamReview NATURAL JOIN user WHERE teamReview.teamID = %s", [id]).fetchall()
    conn.close()
    return jsonify([*map(team_review_serializer, [dict(row) for row in query_results])])
    
def add_team_review(data):   
    conn = db.connect()
    conn.execute("INSERT INTO teamReview (teamRating, teamReview, userID, teamID) VALUES (%s, %s, %s, %s)", 
        [data["rating"], data["review"], data["userID"], data["teamID"]])
    return jsonify({"status":"OK"})

def get_user_team_reviews(id):
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM teams NATURAL JOIN teamReview WHERE teamReview.userID = %s", [id]).fetchall()
    conn.close()
    return jsonify([*map(user_team_review_serializer, [dict(row) for row in query_results])])

def update_team_review(data):
    conn = db.connect()
    print(data)
    conn.execute("UPDATE teamReview SET teamRating = %s, teamReview = %s WHERE teamReviewID = %s", 
        [data["rating"], data["review"], data["reviewID"]])
    conn.close()
    return jsonify({"status":"OK"})

def delete_team_review(id):
    conn = db.connect()
    conn.execute("DELETE FROM teamReview WHERE teamReviewID = %s",[id])
    conn.close()
    return jsonify({"status":"OK"})

def get_user_rating_avg(id):
    conn = db.connect()
    query_results = conn.execute("SELECT avg(ratings.rating) as avgRating FROM (SELECT userID, playerRating as rating from playerReview UNION SELECT userID, teamRating as rating from teamReview) ratings WHERE ratings.userID = %s", [id]).fetchall()
    conn.close()
    return jsonify({"avg": dict(query_results[0])})

#player stats stuff
def add_player_stats(data): #create
    conn = db.connect()
    conn.execute("INSERT INTO player_stats (statsID, timeframe, PTS, AST, REB, PIE, playerID) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
        [data["statsID"], data["timeframe"], data["PTS"], data["AST"], data["REB"], data["PIE"], data["playerID"]])
    conn.close()
    return jsonify({"status":"OK"})

def get_player_stats(id): #read
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM player_stats NATURAL JOIN players WHERE playerID = %s")
    conn.close()
    return jsonify({"playerStats": dict(query_results[0])})

def update_player_stats(data): #update
    conn = db.connect()
    print(data)
    conn.execute("UPDATE player_stats SET statsID = %s, timeframe = %s, PTS = %s, AST = %s, REB = %s, PIE = %s WHERE playerID = %s", 
        [data["statsID"], data["timeframe"], data["PTS"], data["AST"], data["REB"], data["PIE"]])
    conn.close()
    return jsonify({"status":"OK"})

def delete_player_stats(id): #delete
    conn = db.connect()
    conn.execute("DELETE FROM player_stats WHERE statsID = %s",[id])
    conn.close()
    return jsonify({"status":"OK"})

def top_player_stats():
    conn = db.connect()
    #SELECT name, PTS, AVG(playerRating) as avgRating FROM players NATURAL JOIN player_stats NATURAL JOIN playerReview GROUP BY name, PTS LIMIT 15;
    query_results = conn.execute("SELECT name, PTS, AST, REB, PIE, timeframe, AVG(playerRating) as avgRating FROM players NATURAL JOIN player_stats NATURAL JOIN playerReview GROUP BY name, PTS, AST, REB, PIE, timeframe ORDER BY avgRating DESC LIMIT 1;").fetchall()
    conn.close()
    print(query_results)
    return jsonify({"playerStats": dict(query_results[0])})
def get_num_players_team():
    conn = db.connect()
    query_results = conn.execute("SELECT teamName, COUNT(*) as numPlayers FROM players NATURAL JOIN teams GROUP BY (teamName)").fetchall()
    return jsonify([*map(num_players_team_serializer, [dict(row) for row in query_results])])

def search_player_reviews(search):
    search = "%" + search + "%"
    conn = db.connect()
    query_results = conn.execute("SELECT * from playerReview NATURAL JOIN user WHERE playerReview LIKE %s", [search]).fetchall()
    return jsonify([*map(player_review_serializer, [dict(row) for row in query_results])])

def search_team_reviews(search):
    search = "%" + search + "%"
    conn = db.connect()
    query_results = conn.execute("SELECT * from teamReview NATURAL JOIN user WHERE teamReview LIKE %s", [search]).fetchall()
    return jsonify([*map(team_review_serializer, [dict(row) for row in query_results])])

def team_reviewed_stats():
    conn = db.connect()
    query_results = conn.execute("SELECT teamName, AVG(teamRating) as ratings FROM teamReview NATURAL JOIN teams GROUP BY teamName ORDER BY ratings LIMIT 15").fetchall()
    conn.close()
    print(query_results)
    return jsonify({"TeamReview": dict(query_results[0])})

