<?php

    header('Content-type: application/json');
    header('Accept: application/json');

    require_once __DIR__ . '/dataLayer.php';

    $requestMethod = $_SERVER['REQUEST_METHOD'];

    switch ($requestMethod)
    {
        case "GET" : $action = $_GET["action"];
                     getRequests($action);
                     break;
        case "POST" : $action = $_POST["action"];
                     postRequests($action);
                     break;
        case "PUT" : parse_str(file_get_contents("php://input"),$post_vars);
                     $action =  $post_vars["action"];
                     putRequests($action);
                     break;
    }

    function getRequests($action)
    {
        switch($action)
        {
            case "LOGIN": requestLogin();
                          break;
            case "GETCOMMENTS": getComments();
                          break;
            case "GETUSERDATA": getUserData();
                          break;
            case "SEARCHUSER": getSearchResults();
                          break;
            case "SEARCHUSERD": getSearchResultsD();
                          break;
            case "GETREQUESTS": getFriendRequests();
                          break;
            case "GETWEEK": getWeekDates();
                          break;
            case "GETCALENDAR": getCalendar('0');
                          break;
            case "DGETCALENDAR": getCalendar('1');
                          break;
            case "GETSEACHDATA": getSearchData();
                          break;
            case "GETINFOFROMUSER": getUserInfo();
                          break;
        }
    }

    function postRequests($action)
    {
        switch($action)
        {
            case "REGISTER": requestRegistration();
                          break;
            case "UPLOADCOMMENT": uploadComment();
                          break;
            case "SENDFRIENDREQUEST": sendFriendRequest();
                          break;
            case "ACCEPTFRIENDREQUEST": acceptFriendRequest();
                          break;
            case "REJECTFRIENDREQUEST": rejectFriendRequest();
                          break;
            case "CREATEAPPOINTMENT": createAppointmentsIterateWeeks();
                          break;
            case "CANCELAPPOINTMENT": cancelAppointment();
                          break;     
            case "LOGOUT": logoutFromSession();
                          break;  
        }
    }
    
    function putRequests($action)
    {
        switch($action)
        {
            case "SUBSTRACTWEEK": substractWeek();
                          break;
            case "ADDWEEK": addWeek();
                          break;
            case "UPDATEUSER": updateUserInfo();
                          break;
        }
    }
    
    function updateUserInfo()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            parse_str(file_get_contents("php://input"),$post_vars);
            $username =  $post_vars["username"];
            $password =  $post_vars["password"];
            $fName =  $post_vars["fName"];
            $lName =  $post_vars["lName"];
            $mail =  $post_vars["mail"];
            $gender =  $post_vars["gender"];
            $country =  $post_vars["country"];
            $clinic =  $post_vars["clinic"];
            $address =  $post_vars["address"];
            $tittle =  $post_vars["tittle"];
            $speciality =  $post_vars["speciality"];
            $services =  $post_vars["services"];
            $pay =  $post_vars["pay"];
            $userType =  $post_vars["userType"];
            $cambio = $post_vars["cambioPSW"];
            
            $response = attemptUpdate($username, $password, $fName, $lName, $mail, $country, $gender, $clinic, $address, $tittle, $speciality, $services, $userType, $pay,$cambio);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }
    
    function getWeekDates()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];
            
            //////////////////////////////////////////
            $today = date('d', time());
            $todaym = date('m', time());
                    
            $pag = $_SESSION["week"];

            $jd = cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
            $dia = jddayofweek($jd,1);
            $day = 0;
                    
                    switch ($dia) {
                        case "Monday":
                            $day = 0;
                            break;
                        case "Tuesday":
                            $day = 1;
                            break;
                        case "Wednesday":
                            $day = 2;
                            break;
                        case "Thursday":
                            $day = 3;
                            break;
                        case "Friday":
                            $day = 4;
                            break;
                        case "Saturday":
                            $day = 5;
                            break;
                        case "Sunday":
                            $day = 6;
                            break;
                    }
                    
                    $dias = 0 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $lunes = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$lunes = date('Y-m-d', strtotime(" + {$dias} days"));}
                    
                    $dias = 1 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $martes = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$martes = date('Y-m-d', strtotime(" + {$dias} days"));}
                    
                    $dias = 2 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $miercoles = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$miercoles = date('Y-m-d', strtotime(" + {$dias} days"));}
                    
                    $dias = 3 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $jueves = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$jueves = date('Y-m-d', strtotime(" + {$dias} days"));}
                    
                    $dias = 4 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $viernes = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$viernes = date('Y-m-d', strtotime(" + {$dias} days"));}
                    
                    $dias = 5 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $sabado = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$sabado = date('Y-m-d', strtotime(" + {$dias} days"));}
                    
                    $dias = 6 - $day + (7 * $pag);
                    if($dias < 0 ){$dias = abs($dias); $domingo = date('Y-m-d', strtotime(" - {$dias} days"));}
                    else{$domingo = date('Y-m-d', strtotime(" + {$dias} days"));}
            //////////////////////////////////////////
            
            $_SESSION["weekInit"] = $lunes;
            $_SESSION["weekEnd"]  = $domingo;
            
			$response = array(  "monday" => $lunes, "tuesday" => $martes, "wednesday" => $miercoles, 
			                    "thursday" => $jueves,  "friday" => $viernes, "saturday" => $sabado,  
			                    "sunday" => $domingo);

			echo json_encode($response);
        }
    }

    function getFriendRequests()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];

            $response = retreiveFriendRequests($uName);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }
    
    function createAppointmentsIterateWeeks()
    {
        $weeks = $_POST["weeks"];
        $dateE = $_POST["dateE"];
        
            $i = 0;
            do {
                $tempDates[$dateE] = createAppointment($dateE);
                
                $newdate = strtotime ( '+ 7 day' , strtotime ( $dateE ) ) ;
                $dateE = date ( 'Y-m-j' , $newdate );
                $i++;
            } while ($i <= $weeks);
            
            echo json_encode($tempDates);
    }
    
    function createAppointment($dateE)
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];
            $tempArr = array();
            $toUser = $_POST["toUser"];
            $Hours = $_POST["hours"];
            $description = $_POST["description"];
            
            $posOR = strpos($Hours,"|");
            
            if ($posOR !== -1){
                $porcionesH = explode("|", $Hours);
            }
            else{
                $porcionesH[0] = $Hours;
            }
            
            $response = retreiveCalendar($uName, $dateE, $dateE);
            
            $flag = true;
            
            if ($response["status"] == "SUCCESS")
            {
                foreach ($response["response"] as &$valor) {
                    
                    $posOR = strpos($valor["hours"],"|");
                    if ($posOR != -1){
                        $porcionesN = explode("|", $valor["hours"]);
                    }
                    else{
                        $porcionesN[0] = $valor["hours"];
                    }
                    
                    foreach ($porcionesH as &$TryHours) {
                        foreach ($porcionesN as &$DBHours) {
                            if(substr($TryHours,0, strpos($TryHours, ".")) === substr($DBHours,0,strpos($DBHours, ".")))
                            {
                                $seccion1 = explode(".", $TryHours);
                                $seccion2 = explode(".", $DBHours);
                                
                                $Hours1 = explode("-", $seccion1[1]);
                                $Hours2 = explode("-", $seccion2[1]);
 
                                foreach ($Hours1 as &$hour1) {
                                    foreach ($Hours2 as &$hour2) {
                                        if($hour1 === $hour2){
                                            $responseE = array(  "status" => "OCCUPIED" );
                                            $flag = false;
                                        }
                                        $tempArr[ $flag] =  $flag;
                                    }
                                }
                            }
                        }
                    }
                    
                }
                
                if($flag == true)
                {
                    return setAppointment($description, $Hours, $dateE, $toUser, $uName);
                    //$responseE = array(  "status" => "SUCCESS" );
                    //return $responseE;
                
                }
                else
                {
                    return ($responseE);
                }
            }
            else
            {
                return ($response);
            }
        }
    }

    function getCalendar($search)
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            if ($search == '0')
                $uName = $_SESSION["userName"];
            else
                $uName = $_GET["userName"];
            $fDay = $_SESSION["weekInit"];
            $lDay = $_SESSION["weekEnd"];

            $response = retreiveCalendar($uName, $fDay, $lDay);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function getSearchResults()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];
            $search = $_GET["search"];

            $response = retreivesearchResults($uName, $search);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }
    
    function getSearchResultsD()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];
            $search = $_GET["search"];

            $response = retreivesearchResultsD($uName, $search);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function getUserInfo()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_GET["username"];

            $response = retreiveUserData($uName);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function getUserData()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];

            $response = retreiveUserData($uName);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function getSearchData()
    {
        session_start();
        $userSearch = $_GET["user"];

        $response = retreiveUserData($userSearch);

        if ($response["status"] == "SUCCESS")
        {
            echo json_encode($response["response"]);
        }
        else
        {
            errorHandler($response["status"], $response["code"]);
        }
    }

    function getComments()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $uName = $_SESSION["userName"];

            $response = retreiveComments($uName);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["response"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function requestLogin()
    {
        $uName = $_GET["username"];
        $uPassword = $_GET["password"];
        $checked = $_GET["remember"];

        $response = attemptLogin($uName, $uPassword);

        if ($response["status"] == "SUCCESS")
        {
            setSession($uName, $response["response"]["firstName"], $response["response"]["lastName"]);

            if ($checked == "TRUE")
            {
                setcookie("username", $uName, time() + 3600 * 24 * 30, "/", "", 0);
            }
            echo json_encode($response["response"]);
        }
        else
        {
            errorHandler($response["status"], $response["code"]);
        }
    }

    function acceptFriendRequest()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $toUser = $_SESSION["userName"];
            $fromUser = $_POST["fromUser"];

            $response = attemptFriendAccept($fromUser, $toUser);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["status"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function rejectFriendRequest()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $toUser = $_SESSION["userName"];
            $fromUser = $_POST["fromUser"];

            $response = attemptFriendReject($fromUser, $toUser);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["status"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function sendFriendRequest()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $fromUser = $_SESSION["userName"];
            $toUser = $_POST["toUser"];

            $response = attemptFriendRequest($fromUser, $toUser);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["status"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }
    
    function cancelAppointment()
    {
        session_start();
        if(isset($_SESSION["userName"] ))
        {
            $username = $_SESSION["userName"];
            $hour = $_POST["hour"];
            $datetoDel = $_POST["datetoDel"];

            $response = attemptCancelAppointment($username, $hour, $datetoDel);

            if ($response["status"] == "SUCCESS")
            {
                echo json_encode($response["status"]);
            }
            else
            {
                errorHandler($response["status"], $response["code"]);
            }
        }
    }

    function uploadComment()
    {
        $uName = $_POST["username"];
        $comment = $_POST["comment"];
        $commentUser = $_POST["commentUser"];
        $deep = $_POST["deep"];

        $response = attemptUploadComment($uName, $comment, $commentUser, $deep);

        if ($response["status"] == "SUCCESS")
        {
            echo json_encode($response["status"]);
        }
        else
        {
            errorHandler($response["status"], $response["code"]);
        }
    }

    function requestRegistration()
    {
        $uName = $_POST["username"];
        $uPassword = $_POST["password"];
        $fName = $_POST["fName"];
        $lName = $_POST["lName"];
        $mail = $_POST["mail"];
        $country = $_POST["country"];
        $gender = $_POST["gender"];
        $clinic = $_POST["clinic"];
		$address = $_POST["address"];	
		$tittle = $_POST["tittle"];	
		$speciality = $_POST["speciality"];	
		$service1 = $_POST["service1"];	
		$service2 = $_POST["service2"];	
		$service3 = $_POST["service3"];	
		$service4 = $_POST["service4"];	
		$userType = $_POST["userType"];	
		$pay = $_POST["pay"];

        $response = attemptRegistration($uName, $uPassword, $fName, $lName, $mail, $country, $gender,$clinic,$address,$tittle,$speciality,$service1,$service2,$service3,$service4,$userType,$pay);

        if ($response["status"] == "SUCCESS")
        {
            setSession($uName, $fName, $lName);
            echo json_encode($response["status"]);
        }
        else
        {
            errorHandler($response["status"], $response["code"]);
        }

    }
    
    function substractWeek()
    {
        session_start();
        $week = $_SESSION["week"];
        if ($week > 0)
        {
            $_SESSION["week"] = $week - 1;
        }
        $response = array(  "status" => "SUCCESS");
        echo json_encode($response);
    }
    
    function addWeek()
    {
        session_start();
        $week = $_SESSION["week"];
        $_SESSION["week"] = $week + 1;
        $response = array(  "status" => "SUCCESS");
        echo json_encode($response);
    }

    function setSession($userName, $fName, $lName)
    {
        session_start();
        $_SESSION["userName"] = $userName;
        $_SESSION["firstName"] = $fName;
        $_SESSION["lastName"] = $lName;
        $_SESSION["week"] = 0;
    }
    
    function logoutFromSession()
    {
        session_start();
        $response = array(  "status" => "SUCCESS");
        
        if(isset($_SESSION["userName"] ))
        {
            $_SESSION["userName"] = "";
            $_SESSION["firstName"] = "";
            $_SESSION["lastName"] = "";
            $_SESSION["week"] = 0;
            session_destroy();
        }
        echo json_encode($response);
    }

    function errorHandler($status, $code)
    {
        switch ($code) 
        {
            case 406:   header("HTTP/1.1 $code User $status");
                        die("Wrong credentials provided");
                        break;
            case 400:   header("HTTP/1.1 $code User $status");
                        die("No Events");
                        break;
            case 500:   header("HTTP/1.1 $code $status. Bad connection, portal is down");
                        die("The server is down, we couldn't retrieve data from the data base");
                        break;  
            default:    header("HTTP/1.1 ERROR UNKOWN. ???");
                        die("The server is down, ???");
                        break; 
        }
    }

?>





