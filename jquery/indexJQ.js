//$("#UsernameL").val( $.cookie("username") );

//funciona 
$('#submitForm').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	let user = $("#UsernameL").val();
	let psw = $("#PasswordL").val();
	let error1 = $("#errorUser");
	let error2 = $("#errorPswd");
	let step1 = false;
	let step2 = false;
	let checkbox = $('input[name="Remember"]:checked');
	if (checkbox.val())
	{
		checked = "TRUE";
	}
	else
	{
		checked = "FALSE";
	}
	//console.log(checkbox.val());
	if(user === "")
	{
		error1.text("your user!");
	}
	else
	{
		error1.text("");
		step1 = true;
	}

	if(psw === "")
	{
		error2.text("your psswd!");
	}
	else
	{
		error2.text("");
		step2 = true;
	}

	if(step1 && step2)
	{
		let jsonToSend ={
						"username" : user,
						"password" : psw,
						"remember" : checked,
						"action"   : "LOGIN"
					};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				window.location.href = "./home/home.html";
			},
			error : function(error){
				console.log(error);
				error1.text("LOGIN FALLIDO");
				error2.text(error.responseText);
			}
		});
	}
})


$('#cancelForm').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	window.location.href = "./registro/registro.html";
})