<?php

	function connect()
	{
		$servername = "localhost";
		$username = "u541284944_proj";
		$password= "MANUochoa27";
		$dbname = "u541284944_pweb";

		$connection = mysqli_connect("127.0.0.1", $username, $password, $dbname);

		if (!$connection)
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
					FROM users
					WHERE username = '$username'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
				    if (password_verify($password, $row["passwrd"]))
				    {
				        $response = array("firstName" => $row["fName"], "lastname" => $row["lName"]);
				        
				        $conn -> close();
				        return array("status"=>"SUCCESS", "response" => $response);
				    }
				    else
				    {
				        $conn -> close();
				        return array("status" => "NOT_FOUND", "code"=>406);
				    }
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

	function retreiveUserData($username)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM users
					WHERE username='$username'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					$response = array("user" => $row["username"], 
	            					  "fname" => $row["fName"],
	            					  "lname" => $row["lName"],
	            					  "gender" => $row["gender"],
	            					  "mail" => $row["mail"],
	            					  "country" => $row["country"],
	            					  "friends" => $row["friends"],
	            					  "userType" => $row["userType"]);
	            	if ($row["userType"] == 'd')
					{

						$sql = "SELECT *
								FROM doctores
								WHERE username='$username'";

						$result = $conn->query($sql);
						if ($result->num_rows > 0)
						{
							while ($row = $result->fetch_assoc())
							{
								$response2 = array("speciality" => $row["speciality"], 
											"services" => $row["services"],
											"title" => $row["title"],
											"clinic" => $row["clinic"],
											"pay" => $row["paypal"],
											"address" => $row["address"]);
							}
							
							$response3 =array_merge($response,$response2);
							$conn -> close();
							return array("status"=>"SUCCESS", "response" => $response3);
						}
						else
						{
							$conn -> close();
							return array("status" => "DOCTOR_NOT_FOUND", "code"=>406);
						}
						
						
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

    function retreiveCalendar($username, $fDay, $lDay)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM users
					WHERE username='$username'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
			    $response = array();
			    $sqlC = "SELECT *
					FROM calendar
					WHERE (idUser1='$username' OR idUser2='$username') AND date BETWEEN '$fDay' AND '$lDay'";
    			$resultC = $conn->query($sqlC);
    
    			if ($resultC->num_rows > 0)
    			{
    			    while ($rowData = $resultC->fetch_assoc())
    				{
    				    
    				    if ($username == $rowData["idUser1"])
    				    {
    				        $user = $rowData["idUser2"];
    				    }
    				    else
    				    {
    				        $user = $rowData["idUser1"];
    				    }
    				    
    				    $responseTemp = array("idUser" => $user, 
        	            					  "comment" => $rowData["description"],
        	            					  "hours" => $rowData["hours"],
        	            					  "date" => $rowData["date"]);
    				    $date = $rowData["id"];
    					$response[$date] = $responseTemp;
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
    
	function retreiveFriendRequests($username)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM friendrequests
					WHERE toUser = '$username'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
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
					FROM users
					WHERE username = '$username'";

			$resultF = $conn->query($sqlf);
			$rowF = $resultF->fetch_assoc();
			$friends = $rowF["friends"];
			$friends = explode("|", $friends);

			$sql = "SELECT *
					FROM users
					WHERE username = '$search' OR mail = '$search' OR fName = '$search' OR lName = '$search'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
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
					FROM friendrequests
					WHERE fromUser = '$username' AND toUser = '$temp'";

					$resultso = $conn->query($sqlso);

					if ($resultso -> num_rows > 0)
						$unique = "FALSE";

					$sqlsu = "SELECT *
					FROM friendrequests
					WHERE fromUser = '$temp' AND toUser = '$username'";

					$resultsu = $conn->query($sqlsu);

					if ($resultsu -> num_rows > 0)
						$unique = "FALSE";

					//////////////////////

					if ($unique == "TRUE")
					{
						$response[$contador] = $row["fName"] . " " . $row["lName"] .  "|" . $row["mail"] . "|" . $row["username"] . '|' . $row["userType"] ;
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
	
	function retreivesearchResultsD($username, $search)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM users
					WHERE username = '$search'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					//$response = $row["fName"] . $row["lName"] . ' | '. $row["mail"] ;
					$response = array("fName"=>$row["fName"], "lName"=>$row["lName"], "mail"=>$row["mail"] );
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
					FROM users
					WHERE username = '$username'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
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


	function attemptRegistration($uName, $uPassword, $fName, $lName, $mail, $country, $gender, $clinic,$address,$tittle,$speciality,$service1,$service2,$service3,$service4,$userType,$pay)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT username
				FROM users
				WHERE username='$uName'";

			$result = $conn->query($sql);

			if ($result->num_rows == 0)
			{
			    $encryptedPassword = password_hash($uPassword, PASSWORD_DEFAULT);
				$sql = mysqli_query($conn,"INSERT INTO users (fName, lName, username, passwrd, mail, country, gender, userType) 
										VALUES ('$fName','$lName','$uName','$encryptedPassword', '$mail', '$country', '$gender','$userType')");
				
				if(!mysqli_query($conn, $sql)) //returns a boolean
				{
				    
				    if ($userType == 'd')
				    {
				        
				        $allServices = $service1 . ',' . $service2 . ',' . $service3 . ',' . $service4 ;

				        $sql2 = mysqli_query($conn,"INSERT INTO doctores (username, speciality, services, title, clinic, address, paypal) 
										VALUES ('$uName','$speciality','$allServices','$tittle', '$clinic', '$address', '$pay')");
										
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

			if ($result->num_rows > 0)
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
	
	function attemptUpdate($username, $password, $fName, $lName, $mail, $country, $gender, $clinic, $address, $tittle, $speciality, $services, $userType, $pay, $cambio)
	{
		$conn = connect();

		if ($conn != null)
		{
		    if ($cambio == '0')
		    {
		        $sql = "UPDATE users 
                SET fName='$fName', lName='$lName' ,gender='$gender', mail='$mail', country='$country'
                WHERE username='$username'";
		    }
		    else
		    {
		        $encryptedPassword = password_hash($password, PASSWORD_DEFAULT);
		        $sql = "UPDATE users 
                SET fName='$fName', lName='$lName' ,gender='$gender', mail='$mail', country='$country',passwrd='$encryptedPassword'
                WHERE username='$username'";
		    }
            if(mysqli_query($conn, $sql)) //returns a boolean
			{
			    if ($userType === 'd')
		        {
		            $sql = "UPDATE doctores 
                    SET speciality='$speciality', services='$services' ,title='$tittle', clinic='$clinic', address='$address',paypal='$pay'
                    WHERE username='$username'";
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
    				return array("status"=>"SUCCESS");
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
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}
	
	function attemptCancelAppointment($username, $hour, $datetoDel)
	{
		$conn = connect();

		if ($conn != null)
		{
				$sql = mysqli_query($conn,"DELETE FROM calendar 
				        WHERE (idUser1='$username' OR idUser2='$username') AND hours='$hour' AND date='$datetoDel'");
				
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

			if ($result->num_rows > 0)
			{
				$sql = mysqli_query($conn,"INSERT INTO friendrequests (fromUser, toUser, status) 
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
	
	function setAppointment($description, $Hours, $dateE, $toUser, $uName)
	{
		$conn = connect();

		if ($conn != null)
		{
				$sql = mysqli_query($conn,"INSERT INTO calendar (date, description, hours, idUser1, idUser2) 
										VALUES ('$dateE','$description','$Hours', '$uName', '$toUser')");
				
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
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);

		}
	}

	function attemptFriendAccept($fromUser, $toUser)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM friendrequests
					WHERE fromUser='$fromUser' AND toUser='$toUser'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$sql = mysqli_query($conn,"DELETE FROM friendrequests
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
					FROM friendrequests
					WHERE fromUser='$fromUser' AND toUser='$toUser'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$sql = mysqli_query($conn,"DELETE FROM friendrequests
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

			if ($result->num_rows > 0)
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