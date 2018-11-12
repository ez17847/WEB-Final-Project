<?php

	function connect()
	{
		$servername = "localhost";
		$username = "root";
		$password= "root";
		$dbname = "thejammera00816612";

		$connection = new mysqli($servername, $username, $password, $dbname);

		if ($connection->connect_error)
		{
			return null;
		}
		else
		{
			return $connection;
		}
	}

	function attemptLogin($username, $password)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM Users
					WHERE username = '$username' AND passwrd = '$password'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					$response = array("firstName" => $row["fName"], "lastname" => $row["lName"]);
				}

				$conn -> close();
				return array("status"=>"SUCCESS", "response" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function retreiveUserData($username)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM users
					WHERE username='$username'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					$response = array("user" => $row["username"], 
	            					  "fname" => $row["fName"],
	            					  "lname" => $row["lName"],
	            					  "gender" => $row["gender"],
	            					  "mail" => $row["mail"],
	            					  "passwrd" => $row["passwrd"],
	            					  "country" => $row["country"],
	            					  "friends" => $row["friends"]);
				}

				$conn -> close();
				return array("status"=>"SUCCESS", "response" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function retreiveFriendRequests($username)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM friendRequests
					WHERE toUser = '$username'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$response = array();
				$contador  = 0;
				while ($row = $result->fetch_assoc())
				{
					$temp = $row["fromUser"];
					$sql2 = "SELECT *
					FROM users
					WHERE username = '$temp'";

					$resultData = $conn->query($sql2);
					$rowData = $resultData->fetch_assoc();

	                $response[$contador] = $rowData["fName"] . " " . $rowData["lName"] .  "|" . $rowData["mail"] . "|" . $rowData["username"];
	                $contador = $contador + 1;
				}

				$conn -> close();
				return array("status"=>"SUCCESS", "response" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function retreivesearchResults($username, $search)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sqlf = "SELECT *
					FROM Users
					WHERE username = '$username'";

			$resultF = $conn->query($sqlf);
			$rowF = $resultF->fetch_assoc();
			$friends = $rowF["friends"];
			$friends = explode("|", $friends);

			$sql = "SELECT *
					FROM Users
					WHERE username = '$search' OR mail = '$search'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$response = array();
				$contador  = 0;
				while ($row = $result->fetch_assoc())
				{
					$unique = "TRUE";
					$temp = $row["username"];

					if ($username == $temp)
						$unique = "FALSE";

					//////////////////////AMIGOS

					if(in_array($temp, $friends))
						$unique = "FALSE";

					//////////////////////SOLICITUDES

					$sqlso = "SELECT *
					FROM friendRequests
					WHERE fromUser = '$username' AND toUser = '$temp'";

					$resultso = $conn->query($sqlso);

					if ($resultso -> num_rows > 0)
						$unique = "FALSE";

					$sqlsu = "SELECT *
					FROM friendRequests
					WHERE fromUser = '$temp' AND toUser = '$username'";

					$resultsu = $conn->query($sqlsu);

					if ($resultsu -> num_rows > 0)
						$unique = "FALSE";

					//////////////////////

					if ($unique == "TRUE")
					{
						$response[$contador] = $row["fName"] . " " . $row["lName"] .  "|" . $row["mail"] . "|" . $row["username"];
	                	$contador = $contador + 1;
					}
				}

				$conn -> close();
				return array("status"=>"SUCCESS", "response" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function retreiveComments($username)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT comments
					FROM Users
					WHERE username = '$username'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					$comment = explode( '|', $row["comments"] );
	                $response = array();

	                for ($i = 0; $i < sizeof($comment); $i++) {

	                	$response[$i] = $comment[$i];
					    
					}
				}

				$conn -> close();
				return array("status"=>"SUCCESS", "response" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function attemptRegistration($uName, $uPassword, $fName, $lName, $mail, $country, $gender)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT username
				FROM users
				WHERE username='$uName'";

			$result = $conn->query($sql);

			if ($result -> num_rows == 0)
			{
				$sql = mysqli_query($conn,"INSERT INTO Users (fName, lName, username, passwrd, mail, country, gender, active) 
										VALUES ('$fName','$lName','$uName','$uPassword', '$mail', '$country', '$gender', '0')");
				
				if(!mysqli_query($conn, $sql)) //returns a boolean
				{
					$conn -> close();
					return array("status"=>"SUCCESS");
				}
				else
				{
					$conn -> close();
					return array("status" => "ERROR_UPDATING", "code"=>500);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function attemptUploadComment($uName, $comment, $commentUser, $deep)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT username, comments
				FROM users
				WHERE username='$uName'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$row = $result->fetch_assoc();

				if($row["comments"] == "")
				{
					$Fcomment = $uName . " & " . $comment;
				}
				else
				{
					$Fcomment = $row["comments"] . " | " . $uName . " & " . $comment;
				}
				
				$sql = "UPDATE users SET comments='$Fcomment' WHERE username='$uName'";

				if(mysqli_query($conn, $sql)) //returns a boolean
				{
					$conn -> close();
					return array("status"=>"SUCCESS");
				}
				else
				{
					$conn -> close();
					return array("status" => "ERROR_UPDATING", "code"=>500);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function attemptFriendRequest($fromUser, $toUser)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT username
				FROM users
				WHERE username='$fromUser'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$sql = mysqli_query($conn,"INSERT INTO friendRequests (fromUser, toUser, status) 
										VALUES ('$fromUser','$toUser','P')");
				
				if(!mysqli_query($conn, $sql)) //returns a boolean
				{
					$conn -> close();
					return array("status"=>"SUCCESS");
				}
				else
				{
					$conn -> close();
					return array("status" => "ERROR_UPDATING", "code"=>500);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function attemptFriendAccept($fromUser, $toUser)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM friendRequests
					WHERE fromUser='$fromUser' AND toUser='$toUser'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$sql = mysqli_query($conn,"DELETE FROM friendRequests
						WHERE  fromUser='$fromUser' AND toUser='$toUser'");
				
				if(!mysqli_query($conn, $sql)) //returns a boolean
				{
					$response1 = addFriend($fromUser, $toUser);
					$response2 = addFriend($toUser, $fromUser);
					$conn -> close();

					if ($response1["status"] == "SUCCESS" && $response2["status"] == "SUCCESS")
		            {
		                return array("status"=>"SUCCESS");
		            }
		            else
		            {
		                return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
		            }
				}
				else
				{
					$conn -> close();
					return array("status" => "ERROR_UPDATING", "code"=>500);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function attemptFriendReject($fromUser, $toUser)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM friendRequests
					WHERE fromUser='$fromUser' AND toUser='$toUser'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$sql = mysqli_query($conn,"DELETE FROM friendRequests
						WHERE  fromUser='$fromUser' AND toUser='$toUser'");
				
				if(!mysqli_query($conn, $sql)) //returns a boolean
				{
					return array("status"=>"SUCCESS");
				}
				else
				{
					$conn -> close();
					return array("status" => "ERROR_UPDATING", "code"=>500);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function addFriend($User, $Friend)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM users
					WHERE username='$User'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$row = $result->fetch_assoc();
				$friends = $row["friends"];
				$friends = $friends . " | " . $Friend;

				$sql = mysqli_query($conn,"UPDATE  users
						SET friends = '$friends'
						WHERE  username='$User'");
				
				if(!mysqli_query($conn, $sql)) //returns a boolean
				{
					$conn -> close();
					return array("status"=>"SUCCESS");
				}
				else
				{
					$conn -> close();
					return array("status" => "ERROR_UPDATING", "code"=>500);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

?>







