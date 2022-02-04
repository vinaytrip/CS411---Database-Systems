-- After inserting a player review, this stored procedure does the following:

-- For each row in the playerreviews table, determine if the rating is less than or greater than the average rating for that player 
-- (join player with playerreviews and get the average review for the player). 
-- Update the row with “positive” or “negative” accordingly.

-- For each row in the players table, check if the player’s average rating is greater than the average rating of players for his country. 
-- If so, mark the starPlayer column as true. Check if the player’s average rating is greater than the average rating of all players. 
-- If so, mark the MVP column as true.

-- ***We need to insert a "sentiment" VARCHAR(10) column into playerReview table and "starPlayer" BOOL and "MVP" BOOL columns into players table

DELIMITER //
CREATE TRIGGER reviewTrigger
AFTER INSERT ON playerReview FOR EACH ROW
BEGIN
DECLARE pID INT;
DECLARE pCountry VARCHAR(255);
DECLARE pSchool VARCHAR(255);
DECLARE avgRating REAL;
DECLARE exit_loop2 BOOLEAN Default FALSE;
DECLARE cur2 Cursor For (SELECT playerID, country, school FROM players); 
DECLARE continue handler for not FOUND set exit_loop2 = TRUE; 
Open cur2;
loop2: LOOP
FETCH cur2 INTO pID, pCountry, pSchool;
IF exit_loop2 or pID = NULL THEN
LEAVE loop2;
END IF;
SET avgRating = (SELECT AVG(playerRating) FROM playerReview WHERE playerID = pID);
IF (avgRating IS NOT NULL) THEN 
IF (avgRating >= ALL(SELECT AVG(playerRating) FROM playerReview NATURAL JOIN players WHERE players.country = pCountry GROUP BY players.country)) THEN
UPDATE players SET starPlayer = TRUE WHERE players.playerID = pID;
ELSE
UPDATE players SET starPlayer = FALSE WHERE players.playerID = pID;
END IF;
IF (avgRating >= ALL(SELECT AVG(playerRating) FROM playerReview NATURAL JOIN players GROUP BY playerReview.playerID)) THEN
UPDATE players SET MVP = TRUE WHERE players.playerID = pID;
ELSE
UPDATE players SET MVP = FALSE WHERE players.playerID = pID;
END IF;
IF (avgRating >= ALL(SELECT AVG(playerRating) FROM playerReview NATURAL JOIN players WHERE players.school = pSchool GROUP BY players.school)) THEN
UPDATE players SET topAlum = TRUE WHERE players.playerID = pID;
ELSE
UPDATE players SET topAlum = FALSE WHERE players.playerID = pID;
END IF;
END IF;
END LOOP loop2; 
Close cur2;
END //
DELIMITER ;

-- MVP
SELECT * FROM players NATURAL JOIN playerReview WHERE players.MVP = 1;

--topAlum
SELECT AVG(playerRating) as avgRating FROM players NATURAL JOIN playerReview WHERE players.school = "Duke";
SELECT name, AVG(playerRating), AVG(topAlum) as avgRating FROM players NATURAL JOIN playerReview WHERE players.school = "Duke" GROUP BY name ORDER BY avgRating desc;

--star player from country
SELECT AVG(playerRating) as avgRating FROM players NATURAL JOIN playerReview WHERE players.country = "Serbia";
SELECT name, AVG(playerRating), AVG(starPlayer) as avgRating FROM players NATURAL JOIN playerReview WHERE players.country = "Serbia" GROUP BY name ORDER BY avgRating desc;
