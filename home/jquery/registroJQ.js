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
	
	let pay = $("#pay").val();
    let clinic = $("#clinic").val();
    let address = $("#address").val();
	let tittle = $("#tittle").val();
	let speciality = $("#speciality").val();
	let service1 = $("#service1").val();
	let service2 = $("#service2").val();
	let service4 = $("#service4").val();
	let service3 = $("#service3").val();

	let errorName = $("#errorName");
	let errorLast = $("#errorLast");
	let errorUser = $("#errorUser");
	let errorMail = $("#errorMail");
	let errorPass = $("#errorPass");
	let errorConfirm = $("#errorConfirm");
	let errorCountry = $("#errorCountry");
	let errorPay =$("#errorPay");
	let errorClinic=$("#errorClinic");
	let errorAddress=$("#errorAddress");
	let errorTittle=$("#errorTittle");
	let errorSpeciality=$("#errorSpeciality");
	let errorService=$("#errorService");
	let userGenderError = $("#errorGender");

    let error = false;
	let x1= false;
	let x2= false;
	let x3= false;
	let x4= false;
	let x5= false;
	let x6= false;
	let x7= false;

	if(name === ""){ errorName.text("Write your name");error = true;}
	else{errorName.text(""); x1= true; }
	if(lname === ""){ errorLast.text("Write your last name(s)");error = true;}
	else{errorLast.text(""); x2= true; }
	if(user === ""){ errorUser.text("Write your user");error = true;}
	else{errorUser.text(""); x3= true; }
	if(mail === ""){ errorMail.text("Write your email");error = true;}
	else{errorMail.text(""); x4= true; }
	if(pswd === ""){ errorPass.text("Write your password");error = true;}
	else{errorPass.text(""); x5= true;}
	if(pswdR === "")
	{ errorConfirm.text("Confirm your password");error = true;}
	else if (pswdR != pswd) { errorConfirm.text("The passwords are not equal");error = true;}
	else{errorConfirm.text(""); x6= true;}


	//Section for the selector
	if(Country == "0"){ errorCountry.text("Select your country");error = true;}
	else{errorCountry.text(""); x7= true;}


	//Section for de Radio buttons
	let genderRadios = $("input[name=gender]");
	let selectedFlag = false;



	if($("input[name=gender]").is(':checked')) {  
        userGenderError.text(""); 
        selectedFlag = true;
    } 
    else 
    {  
        userGenderError.text("Please select a Gender");	 
        selectedFlag = false;
        error = true;
    } 

    if($("input[name=Doctor]").is(':checked')) 
    {
        if( clinic === "")
        {
            error = true;
            errorClinic.text("Provide a clinic");
        }
        else
        {
            errorClinic.text("");
        }
        if( address === "")
        {
            error = true;
            errorAddress.text("Write your address");
        }
        else
        {
            errorAddress.text("");
        }
        if( tittle == "0")
        {
            error = true;
            errorTittle.text("Select a tittle");
        }
        else
        {
            errorTittle.text("");
        }
        if(speciality === "")
        {
            error = true;
            errorSpeciality.text("Write your speciality");
        }
        else
        {
            errorSpeciality.text("");
        }
        if(service1 === "")
        {
            error = true;
            errorService.text("Provide your main service to offer");
        }
        else
        {
            errorService.text("");
        }

    }
    

	if(!error && selectedFlag)
	{
	    let userType = 'p';
	    if($("input[name=Doctor]").is(':checked'))
	       userType = 'd';
	    
       
		let jsonToSend ={
						"username" : user,
						"password" : pswd,
						"fName" : name,
						"lName" : lname,
						"mail"  : mail,
						"country" : Country,
						"gender" : $('input[name=gender]:checked').val(), 
						"clinic": clinic,
						"address": address,
						"tittle": tittle,
						"speciality":speciality,
						"service1": service1,
						"service2": service2,
						"service3": service3,
						"service4": service4,
						"userType": userType,
						"pay":pay,
						"action"   : "REGISTER"
					};
		console.log (jsonToSend);
        
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

$('#CheckIfDoctor').on('click', function(event){
    if($("input[name=Doctor]").is(':checked')) {  
        $("#ifIsDoctor").removeClass("hiddenElement");
        selectedFlag = true;
    } else {  
        $("#ifIsDoctor").addClass("hiddenElement");
        selectedFlag = false;
    } 
});


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
    
    $("#pay").val('');
    $("#clinic").val('');
    $("#address").val('');
	$("#tittle").val("0");
	$("#speciality").val('');
	$("#service1").val('');
	$("#service2").val('');
	$("#service4").val('');
	$("#service3").val('');
    

	let errorName = $("#errorName");
	let errorLast = $("#errorLast");
	let errorUser = $("#errorUser");
	let errorMail = $("#errorMail");
	let errorPass = $("#errorPass");
	let errorConfirm = $("#errorConfirm");
	let errorCountry = $("#errorCountry");
	let userGenderError = $("#errorGender");
	let errorPay =$("#errorPay");
	let errorClinic=$("#errorClinic");
	let errorAddress=$("#errorAddress");
	let errorTittle=$("#errorTittle");
	let errorSpeciality=$("#errorSpeciality");
	let errorService=$("#errorService");

    //hide section of service provider
    
    if($("input[name=Doctor]").is(':checked'))
    {
        $("input[name=Doctor]").prop('checked', false);
        $("#ifIsDoctor").addClass("hiddenElement");
    }
    
    
	errorName.text("");
	errorLast.text("");
	errorUser.text("");
	errorMail.text("");
	errorPass.text("");
	errorConfirm.text("");
	errorCountry.text("");
    userGenderError.text("");
    errorPay.text("");
    errorClinic.text("");
    errorAddress.text("");
    errorTittle.text("");
    errorSpeciality.text("");
    errorService.text("");
    
	let selectedFlag = false;


	if($("input[name=gender]").is(':checked')) 
	{  
        $("input[name=gender]").prop('checked', false);
    } 
})
