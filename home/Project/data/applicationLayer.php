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
            case "GETREQUESTS": getFriendRequests();
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

        $response = attemptRegistration($uName, $uPassword, $fName, $lName, $mail, $country, $gender);

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

    function setSession($userName, $fName, $lName)
    {
        session_start();
        $_SESSION["userName"] = $userName;
        $_SESSION["firstName"] = $fName;
        $_SESSION["lastName"] = $lName;
    }

    function errorHandler($status, $code)
    {
        switch ($code) 
        {
            case 406:   header("HTTP/1.1 $code User $status");
                        die("Wrong credentials provided");
                        break;
            case 500:   header("HTTP/1.1 $code $status. Bad connection, portal is down");
                        die("The server is down, we couldn't retrieve data from the data base");
                        break;  
        }
    }

?>





