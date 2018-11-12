////////////////////////////////////////REGISTRO
//funciona 



$('#submitFormR').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	validateForm2R();
})

function validateForm2R(){
	let name = $("#NameR").val();
	let lname = $("#LNameR").val();
	let user = $("#UserNameR").val();
	let mail = $("#EMailR").val();
	let pswd = $("#PasswordR").val();
	let pswdR = $("#RPasswordR").val();
	let Country = $("#Country").val();

	let error1 = $("#error1");
	let error2 = $("#error2");
	let error3 = $("#error3");
	let error4 = $("#error4");
	let error5 = $("#error5");
	let error6 = $("#error6");
	let error7 = $("#error7");

	let x1= false;
	let x2= false;
	let x3= false;
	let x4= false;
	let x5= false;
	let x6= false;
	let x7= false;

	if(name === ""){ error1.text("tu nombre!");}
	else{error1.text(""); x1= true;}
	if(lname === ""){ error2.text("tu apellido!");}
	else{error2.text(""); x2= true;}
	if(user === ""){ error3.text("tu user!");}
	else{error3.text(""); x3= true;}
	if(mail === ""){ error4.text("tu mail!");}
	else{error4.text(""); x4= true;}
	if(pswd === ""){ error5.text("tu pswd!");}
	else{error5.text(""); x5= true;}
	if(pswdR === "")
	{ error6.text("tu pswd2!");}
	else if (pswdR != pswd) { error6.text("tu pswd no coincide con pswd2!");}
	else{error6.text(""); x6= true;}


	//Section for the selector
	if(Country == "0"){ error7.text("tu pais!");}
	else{error7.text(""); x7= true;}


	//Section for de Radio buttons
	let genderRadios = $("input[name=gender]");
	let selectedFlag = false;
	let userGenderError = $("#errorGender");


	if($("input[name=gender]").is(':checked')) {  
            userGenderError.text(""); 
            selectedFlag = true;
        } else {  
            userGenderError.text("Please select a Gender");	 
            selectedFlag = false;
        } 



	if(x1 && x2 && x3 && x4 && x5 && x6 && x7 && selectedFlag)
	{

		let jsonToSend ={
						"username" : user,
						"password" : pswd,
						"fName" : name,
						"lName" : lname,
						"mail"  : mail,
						"country" : Country,
						"gender" : $('input[name=gender]:checked').val(), 
						"action"   : "REGISTER"
					};

		$.ajax({
			url : "../data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				$("#exitoPHP").text("EXITO CREANDO USUARIO");
				$("#errorPHP").text("");
				window.location.href = "../home/home.html";
			},
			error : function(error){
				console.log("ERROR");
				console.log(error);
				$("#errorPHP").text(error.responseText);
				$("#exitoPHP").text("");
			}
		});
	}
}



//////////////////CLEAR
$('#clearFormR').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	$("#NameR").val("");
	$("#LNameR").val("");
	$("#UserNameR").val("");
	$("#EMailR").val("");
	$("#PasswordR").val("");
	$("#RPasswordR").val("");
	$("#Country").val("0");

	let error1 = $("#error1");
	let error2 = $("#error2");
	let error3 = $("#error3");
	let error4 = $("#error4");
	let error5 = $("#error5");
	let error6 = $("#error6");
	let error7 = $("#error7");

	error1.text("");
	error2.text("");
	error3.text("");
	error4.text("");
	error5.text("");
	error6.text("");
	error7.text("");

	let selectedFlag = false;
	let userGenderError = $("#errorGender");

	if($("input[name=gender]").is(':checked')) {  
            userGenderError.text(""); 
            $("input[name=gender]").prop('checked', false);
        } 
})
