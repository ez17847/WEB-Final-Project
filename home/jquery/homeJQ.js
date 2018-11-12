////////////////////////////////////////REGISTRO
//funciona 
let jsonToSendC ={
						"action"   : "GETCOMMENTS"
					};
$.ajax({
	url : "../data/applicationLayer.php",
	type : "GET",
	data : jsonToSendC,
	ContentType : "application/json",
	dataType : "json",
	success: function(data){
		
		//console.log(data);
		let html = "";

		
		//console.log(Object.keys(data).length);

		var obj = Object.keys(data).length;

		for (var i=0; i<obj; i++) {
		    ////console.log(data[i]);
		    var parts = data[i].split('&');

		    var sections = Object.keys(parts).length;
		    var userO =  "";
		    var commentO =  "";

		    if( data === "")
		    {
		    	userO =  "NO COMMENTS";
		    }
		    else 
		    {
		    	var str1 =  parts[0];
		    	commentO = parts[1];
				var str2 = "User: ";
				userO = str2.concat(str1);

				if( sections == '1')
			    {
			    	userO =  "Anonymus";
			    	commentO = parts[0];
			    }

			    html += `	<div class="listHome">
							<span>${userO}</span>
							<br>
							<span>${commentO}</span>
							<br><br>
                            <input type="radio" class="radio answerComment" name="comment" value="${commentO}"/>Responder
							</div>
							<br>
						`;
		    }
		}
		////console.log(html);

		$('#commentsI').append(html);
	},
	error: function(err){
		//console.log(err);
	}
});

let jsonToSendR ={
						"action"   : "GETREQUESTS"
					};
$.ajax({
	url : "../data/applicationLayer.php",
	type : "GET",
	data : jsonToSendR,
	ContentType : "application/json",
	dataType : "json",
	success: function(data){
			//console.log(data);

			let $newHtml = "";
			let $counter = 1;
			let $buttonhidden = $("#addFriend");

			$.each(data, function () {
				let $html = $(".request" + $counter);
				let $name = $("#nameR" + $counter);
				let $data = $("#userR" + $counter);

				//console.log(".request" + $counter);
				//console.log($html);

				$parts = this.split('|');
            	//console.log($parts[0]); 
            	//console.log($parts[1]);
            	//console.log($parts[2]);

            	$name.text(`Name: ${$parts[0]}`);
            	$data.text(`${$parts[1]}  < - >  UserName: ${$parts[2]}`);

				$html.attr('id', $parts[2]);
				$html.removeClass("hiddenElement");
				$counter = $counter + 1;

            });
	},
	error: function(err){
		//console.log(err);
	}
});

$('.acceptFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	//console.log($search);

	let jsonToSend ={
							"fromUser"   : $search,
							"action"   : "ACCEPTFRIENDREQUEST"
						};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			$(".acceptRequest").text(data);
			//$temp = $temp.substr($temp.length -1);
			//console.log(data);
			//$("#addrequest" + $)
		},
		error: function(err){
			$(".acceptRequest").text(err);
			//console.log(err);
		}
	});					

});

$('.rejectFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	//console.log($search);

	let jsonToSend ={
							"fromUser"   : $search,
							"action"   : "REJECTFRIENDREQUEST"
						};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			$(".acceptRequest").text(data);
			//$temp = $temp.substr($temp.length -1);
			//console.log(data);
			//$("#addrequest" + $)
		},
		error: function(err){
			$(".acceptRequest").text(err);
			//console.log(err);
		}
	});					

});


$('#commentForm').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit

	if (!$.trim($("#comment").val())) {
        alert("Empty Comment!");
    }
    else
    {
    	let jsonToSendD ={
						"action"   : "GETUSERDATA"
					};

		$.ajax({
				url : "../data/applicationLayer.php",
				type : "GET",
				data : jsonToSendD,
				ContentType : "application/json",
				dataType : "json",
				success: function(data){

					if ($.trim(data))
					{
						let user = data.user;

						let html = "";
						let comment = $('#comment').val();

							html = `	<div class="listHome">
										<span>User: ${user}</span>
										<br>
										<span>${comment}</span>
										<br><br>
                            			<input type="radio" class="radio answerComment" name="comment" value="${comment}"/>Responder
										</div>
										<br>
									`;

						$('#commentsI').append(html);
						$('#comment').val("");
						alert("NICE!");

						let jsonToSend ={
							"username" : user,
							"comment" : comment,
							"commentUser" : "NONE",
							"deep" : "0",
							"action"   : "UPLOADCOMMENT"
						};

						//console.log(user + " " + comment);
						$.ajax({
							url : "../data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success: function(data){
								//console.log(data);
							},
							error: function(err){
								//console.log(err);
							}
						});


					}
					else
					{
						//console.log("EMPTY! ")
					}

				},
				error: function(err){
					//console.log(err);
				}
		});
    }
});


$('.menu > li').on('click', function(event){
	////console.log($(this));
	let $currentElement = $(this);

	//Remove the class selected from the <li>
	$('.selected').removeClass('selected');	

	//Add the class selected to the clicked <li>
	$(this).addClass('selected');

	let currentId = $($currentElement).attr('id');
	//Append the word Section

	$('main > section').addClass('hiddenElement');
	
	if (currentId != 'information')
	{
		$('#information').addClass('hiddenElement');
		$('#map').addClass('hiddenElement');
		$('#map').html('');
	}

	$('#' + currentId + 'Section').removeClass('hiddenElement');
});




///////////////////////////AJAX CODE, JSON///////////////////////////////

let jsonToSendD ={
						"action"   : "GETUSERDATA"
					};

$.ajax({
	url : "../data/applicationLayer.php",
	type : "GET",
	data : jsonToSendD,
	ContentType : "application/json",
	dataType : "json",
	success : function(data){

		let newHtml = "";
		let html = "";
		//console.log(data);
		let friendList;

		let friends = "NONE";
		if (data.friends !== "")
		{
			friends = data.friends;
			friendList = friends.split('|');
			//console.log(friendList);

			for (var i = 0; i < friendList.length; i++) 
			{
				let temp = friendList[i].trim();

				if (temp)
				{
					dataFromUser(temp,i);
				}
			}
			$('#friendsI').append(html);
		}
		else
		{
			html = `	<div class="listHome">
							<span><br>YOU HAVE NO FRIENDS</span>
							<br>SORRY...<br><br>
							</div>
							<br>
						`;
			$('#friendsI').prepend(html);
		}
		
		if ($.trim(data))
		{
			newHtml += `<div class="contactCard">
							<div class="contactsName"> 
								${data.fname} ${data.lname}
							</div>
							<br>
							<div class="contactsDescription">
								UserName: ${data.user}
								<br>
								Mail: ${data.mail}
								<br>
								Gender: ${data.gender}
								<br>
								Country: ${data.country}
								<br>
								Friends: ${friends}
							</div>
							<br>
						</div>`;
			$("#NameR").val(data.fname);
			$("#LNameR").val(data.lname);
			$("#UserNameR").html('<br>'+data.user);
			$("#EMailR").val(data.mail);
			$("#Country").val(data.country);
			$('#' + data.gender).prop('checked',true);
			
			console.log("My profile", data);
			if (data.userType == 'd')
			{
			    $('#ifIsDoctorHome').removeClass("hiddenElement");
			    $('#pay').val(data.pay);
			    $('#clinic').val(data.clinic);
			    $('#address').val(data.address);
			    $('#tittle').val(data.title);
			    $('#speciality').val(data.speciality);
			    let services = data.services;
			    let servicesarray=services.split(',');
			    $('#service1').val(servicesarray[0]);
			    $('#service2').val(servicesarray[1]);
			    $('#service3').val(servicesarray[2]);
			    $('#service4').val(servicesarray[3]);
			    
			}
			else
			{
			    $('#ifIsDoctorHome').addClass("hiddenElement");
			    $('#pay').val('');
			    $('#clinic').val('');
			    $('#address').val('');
			    $('#tittle').val('');
			    $('#speciality').val('');
			    $('#service1').val('');
			    $('#service2').val('');
			    $('#service3').val('');
			    $('#service4').val('');
			}
			    
			
		}
		
	},

	error : function(err){
		alert(err.responseText);
		//console.log(err);
		$(location).attr('href', '../index.html');
	}
});


$('#searchButton').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	let search = $("#searchItem").val();

	let jsonToSend ={
						"search" : search,
						"action" : "SEARCHUSER"
					};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(data){
			////console.log(data);
			let $newHtml = "";
			let $counter = 1;
			let $buttonhidden = $(".addFriend");

			$.each(data, function () {
				let $html = $(".comment" + $counter);
				let $name = $("#name" + $counter);
				let $data1 = $("#user" + $counter + '1');
				let $data2 = $("#user" + $counter + '2');

				//console.log(".comment" + $counter);
				//console.log($html);

				$parts = this.split('|');
            	//console.log($parts[0]); 
            	//console.log($parts[1]);
            	//console.log($parts[2]);

                let TypetoShow = '';

                if($parts[3] == 'd')
                    TypetoShow = 'Doctor';

            	$name.text(`Name: ${TypetoShow} ${$parts[0]}`);
            	$data1.text(`E-Mail : ${$parts[1]} `);
            	$data2.text(`UserName: ${$parts[2]}`);

				$html.attr('id', $parts[2]);
				$html.removeClass("hiddenElement");
				$counter = $counter + 1;

            });

		},
		error : function(error){
			//console.log(error);
			$("#searchError").text("I FAILED YOU, MASTER...");
		}
	});
});


$('.addFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	//console.log($search);

	let jsonToSend ={
							"toUser"   : $search,
							"action"   : "SENDFRIENDREQUEST"
						};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			$(".addrequest").text(data);
			//$temp = $temp.substr($temp.length -1);
			//console.log(data);
			//$("#addrequest" + $)
			$('#'+$search).addClass('hiddenElement');
		},
		error: function(err){
			//console.log(err);
			$(".addrequest").text(err);
		}
	});					

});


var SearchResult = "";
$('.infoFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	//console.log($search);

	let jsonToSend ={
							"user"   : $search,
							"action"  : "GETSEACHDATA"
						};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){

			console.log(data);

			
			//Remove the class selected from the <li>
			$('.selected').removeClass('selected');	
			//Add the class selected
			$('#information').addClass('selected');

			$('main > section').addClass('hiddenElement');

			$('#information').removeClass('hiddenElement');
			$('#informationSection').removeClass('hiddenElement');
			let newHTML = '';
            if(typeof(data.title) == 'undefined')
            {
                newHTML = `
						<legend> ${data.fname} ${data.lname}</legend>
						E-Mail : ${data.mail}
						<br>
						Country : ${data.country}
						<br>
						`;
				$('#informationHeader').html('Client Information');
            }
                
            else
            {
                $('#informationHeader').html('Profesional Information');
			    newHTML = `
						<legend> ${data.fname} ${data.lname}</legend>
						Tittle : ${data.title}
						<br>
						Speciality : ${data.speciality}
						<br>
						Clinic : ${data.clinic}
						<br>
						E-Mail : ${data.mail}
						<br>
						Country : ${data.country}
						<br>
						Services : ${data.services}
						<br>
						Address: ${data.address}
						`;
						$('#map').removeClass('hiddenElement');
						//let tempAddress = "Mexico, Nuevo León, Monterrey, Esparta ,3212"
                        console.log("Direccion",data.address);
						mapOperation(data.address);
            }

			$('#infomationFieldset').html(newHTML);
			window.SearchResult = data.user;
			let userSearch = window.SearchResult;
			reload_weeks_D(userSearch);
		},
		error: function(err){
			console.log(err);
			//$(".addrequest").text(err);
		}
	});
});

function reload_weeks_D(userSearch){
	let jsonToSendW ={
					"action"   : "GETWEEK"
				};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSendW,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			console.log(data);
			$("#Dlu").html(`Monday <br> ${data.monday}`);
			$("#Dma").html(`Tuesday <br> ${data.tuesday}`);
			$("#Dmi").html(`Wednesday <br> ${data.wednesday}`);
			$("#Dju").html(`Thursday <br> ${data.thursday}`);
			$("#Dvi").html(`Friday <br> ${data.friday}`);
			$("#Dsa").html(`Saturday <br> ${data.saturday}`);
			$("#Ddo").html(`Sunday <br> ${data.sunday}`);
			cleanCells_D();
			get_weekSchedule_D(userSearch);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function get_weekSchedule_D(userSearch){
	let jsonToSendCal ={
					"action"   : "DGETCALENDAR",
					"userName" : userSearch
				};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSendCal,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			$.each(data, function () {
				let $date = this.date;
				let $hours = this.hours;
				let $hoursSave = $hours;
				let $idUser = this.idUser;
				let $comment= this.comment;
				$info = $idUser + "|" + $comment;

				let $pos = $hours.indexOf('|');
				if ($pos != -1) {
					let $hours2 = $hours.substring($pos + 1 );
					$hours = $hours.substring(0, $pos);
				   
					$pos = $hours2.indexOf('.');
					let $data = $hours2.substring($pos + 1 );
					$hours2 = $hours2.substring(0, $pos);
					
					if (typeof $("#D"+$hours2).data('occupied') !== 'undefined') {
						$temp = $("#D"+$hours2).data("occupied");
						
						$last = $temp.substr($temp.length - 1);
						$first = $data.charAt(0);
						
						if($last > $first)
						{
							$("#D"+$hours2).data("occupied", $data + $temp);
						}
						else
						{
							$("#D"+$hours2).data("occupied", $temp + $data);
						}
					}
					else
					{
						$("#D"+$hours2).data("occupied", $data);
					}
					$string = $info + "|" + $data  + "|" + $hoursSave ;
					
					if (typeof $("#D"+$hours2).data('info') !== 'undefined') {
						$temp = $("#D"+$hours2).data("info");
						$("#D"+$hours2).data("info",  $temp + "&" + $string);
					}
					else{
						$("#D"+$hours2).data("info", $string);
					}
				}
				
				$pos = $hours.indexOf('.');
				let $data = $hours.substring($pos + 1 );
				$hours = $hours.substring(0, $pos);
				$string = $info + "|" + $data + "|" + $hoursSave ;
				
				if (typeof $("#D"+$hours).data('occupied') !== 'undefined') {
					$temp = $("#D"+$hours).data("occupied");
					$last = $temp.substr($temp.length - 1);
					$first = $data.charAt(0);
					
					if($last > $first)
					{
						$("#D"+$hours).data("occupied", $data + $temp);
					}
					else
					{
						$("#D"+$hours).data("occupied", $temp + $data);
					}
				}
				else
				{
					$("#D"+$hours).data("occupied", $data);
				}
				
				if (typeof $("#D"+$hours).data('info') !== 'undefined') {
					$temp = $("#D"+$hours).data("info");
					$("#D"+$hours).data("info",  $temp + "&" + $string);
				}
				else{
					$("#D"+$hours).data("info", $string);
				}
				
			});
			//markCells_D();
		},
		error: function(err){
			console.log(err);
		}
	});

	jsonToSendCal ={
		"action"   : "GETCALENDAR",
		"userName" : userSearch
	};
	$.ajax({
	url : "../data/applicationLayer.php",
	type : "GET",
	data : jsonToSendCal,
	ContentType : "application/json",
	dataType : "json",
	success: function(data){
	$.each(data, function () {
		let $date = this.date;
		let $hours = this.hours;
		let $idUser = this.idUser;
		let $comment= this.comment;
		let $hoursSave = $hours;
		$info = $idUser + "|" + $comment;

		let $pos = $hours.indexOf('|');
		if ($pos != -1) {
			let $hours2 = $hours.substring($pos + 1 );
			$hours = $hours.substring(0, $pos);
		
			$pos = $hours2.indexOf('.');
			let $data = $hours2.substring($pos + 1 );
			$hours2 = $hours2.substring(0, $pos);
			
			if (typeof $("#D"+$hours2).data('occupied') !== 'undefined') {
				$temp = $("#D"+$hours2).data("occupied");
				
				$last = $temp.substr($temp.length - 1);
				$first = $data.charAt(0);
				
				if($last > $first)
				{
					$("#D"+$hours2).data("occupied", $data + $temp);
				}
				else
				{
					$("#D"+$hours2).data("occupied", $temp + $data);
				}
			}
			else
			{
				$("#D"+$hours2).data("occupied", $data);
			}
			$string = $info + "|" + $data + '|' + $hoursSave;
			
			if (typeof $("#D"+$hours2).data('info') !== 'undefined') {
				$temp = $("#D"+$hours2).data("info");
				$("#D"+$hours2).data("info",  $temp + "&" + $string);
			}
			else{
				$("#D"+$hours2).data("info", $string);
			}
		}
		
		$pos = $hours.indexOf('.');
		let $data = $hours.substring($pos + 1 );
		$hours = $hours.substring(0, $pos);
		$string = $info + "|" + $data + '|' + $hoursSave;
		
		if (typeof $("#D"+$hours).data('occupied') !== 'undefined') {
			$temp = $("#D"+$hours).data("occupied");
			$last = $temp.substr($temp.length - 1);
			$first = $data.charAt(0);
			
			if($last > $first)
			{
				$("#D"+$hours).data("occupied", $data + $temp);
			}
			else
			{
				$("#D"+$hours).data("occupied", $temp + $data);
			}
		}
		else
		{
			$("#D"+$hours).data("occupied", $data);
		}
		
		if (typeof $("#D"+$hours).data('info') !== 'undefined') {
			$temp = $("#D"+$hours).data("info");
			$("#D"+$hours).data("info",  $temp + "&" + $string);
		}
		else{
			$("#D"+$hours).data("info", $string);
		}
		
	});
	markCells_D();
	},
	error: function(err){
	console.log(err);
	}
	});
}

function markCells_D(){
	$('#Dhorario tr').each(function () {
	   $(this).find('td input').each(function () {
			$id = "#" + $(this).attr('id');
			if (typeof $($id).data('occupied') !== 'undefined') {
				
				let occupiedHoursString = $($id).data("occupied");
				let occupiedHoursSperated = occupiedHoursString.split('-');
				//console.log("Separacion string",occupiedHoursString,occupiedHoursSperated);
				let positionsHours = [0,0,0,0];
				for (let i = 0; i < occupiedHoursSperated.length; i++)
				{
					let currentHour = occupiedHoursSperated[i];
					if (currentHour.length>=2)
					{
						//console.log("son dobles");
						for (let j=0; j <currentHour.length; j++ )
						{
						    let number = currentHour[j];
						    positionsHours[number] = 1;
						}
						/*let number1 = parseInt(currentHour[0]);
						let number2 = parseInt(currentHour[1]);
						//console.log("son dobles",number1,number2);
						positionsHours[number1] = 1;
						positionsHours[number2] = 1;*/
					}
					else
					{
						//console.log("es uno");
						let number = parseInt(currentHour);
						//console.log("es uno,",number);
						positionsHours[number] = 1;
					}
				}

				let $tam = positionsHours[0]+positionsHours[1]+positionsHours[2]+positionsHours[3];

				if ( $tam >= 4)
				{
					$($id).addClass("occupied");
				}
				else if ($tam >= 1)
				{
					$($id).addClass("semiOccupied");
				}
			}
	   });
   });  
}

function cleanCells_D(){
	$('#Dhorario tr').each(function () {
	   $(this).find('td input').each(function () {
		   $id = "#" + $(this).attr('id');
		   if (typeof $($id).data('occupied') !== 'undefined') {
				$($id).removeData('occupied');
				$($id).removeClass("occupied");
				$($id).removeClass("semiOccupied");
		   }
			
			if (typeof $($id).data('info') !== 'undefined') {
			   $($id).removeData('info');
		   }
	   });
   });  
}

$("#Darrow-left").on('click', function(event){
	event.preventDefault(); 
	let jsonToSend ={
							"action"   : "SUBSTRACTWEEK"
					};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "PUT",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			let userSearch = window.SearchResult;
			reload_weeks_D(userSearch);
		},
		error: function(err){
			console.log(err);
		}
	});					
});

$("#Darrow-right").on('click', function(event){
	event.preventDefault(); 
	let jsonToSend ={
							"action": "ADDWEEK"
					};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "PUT",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			let userSearch = window.SearchResult;
			reload_weeks_D(userSearch);
		},
		error: function(err){
			console.log(err);
		}
	});					
});

let jsonToSendReq ={
						"action"   : "GETREQUESTS"
					};
$.ajax({
	url : "../data/applicationLayer.php",
	type : "GET",
	data : jsonToSendReq,
	ContentType : "application/json",
	dataType : "json",
	success: function(data){
			//console.log(data);

			let $newHtml = "";
			let $counter = 1;
			let $buttonhidden = $("#addFriend");

			$.each(data, function () {
				let $html = $(".request" + $counter);
				let $name = $("#nameR" + $counter);
				let $data = $("#userR" + $counter);

				//console.log(".request" + $counter);
				//console.log($html);

				$parts = this.split('|');
            	//console.log($parts[0]); 
            	//console.log($parts[1]);
            	//console.log($parts[2]);

            	$name.text(`Name: ${$parts[0]}`);
            	$data.text(`${$parts[1]}  < - >  UserName: ${$parts[2]}`);

				$html.attr('id', $parts[2]);
				$html.removeClass("hiddenElement");
				$counter = $counter + 1;

            });
	},
	error: function(err){
		//console.log(err);
	}
});

function reload_weeks(){
	    let jsonToSendW ={
						"action"   : "GETWEEK"
					};
        $.ajax({
        	url : "../data/applicationLayer.php",
        	type : "GET",
        	data : jsonToSendW,
        	ContentType : "application/json",
        	dataType : "json",
        	success: function(data){
        	    console.log(data);
        	    $("#lu").html(`Monday <br> ${data.monday}`);
        	    $("#ma").html(`Tuesday <br> ${data.tuesday}`);
        	    $("#mi").html(`Wednesday <br> ${data.wednesday}`);
        	    $("#ju").html(`Thursday <br> ${data.thursday}`);
        	    $("#vi").html(`Friday <br> ${data.friday}`);
        	    $("#sa").html(`Saturday <br> ${data.saturday}`);
        	    $("#do").html(`Sunday <br> ${data.sunday}`);
        	    cleanCells();
        	    get_weekSchedule();
        	},
        	error: function(err){
        		console.log(err);
        	}
        });
}

function get_weekSchedule(){
        let jsonToSendCal ={
						"action"   : "GETCALENDAR"
					};
        $.ajax({
        	url : "../data/applicationLayer.php",
        	type : "GET",
        	data : jsonToSendCal,
        	ContentType : "application/json",
        	dataType : "json",
        	success: function(data){
        	    $.each(data, function () {
        	        let $date = this.date;
        	        let $hours = this.hours;
        	        let $hoursSave = $hours;
        	        let $idUser = this.idUser;
        	        let $comment= this.comment;
        	        $info = $idUser + "|" + $comment;

        	        let $pos = $hours.indexOf('|');
        	        if ($pos != -1) {
                        let $hours2 = $hours.substring($pos + 1 );
                        $hours = $hours.substring(0, $pos);
                       
                        $pos = $hours2.indexOf('.');
                        let $data = $hours2.substring($pos + 1 );
                        $hours2 = $hours2.substring(0, $pos);
                        
                        if (typeof $("#"+$hours2).data('occupied') !== 'undefined') {
                            $temp = $("#"+$hours2).data("occupied");
                            
                            $last = $temp.substr($temp.length - 1);
                            $first = $data.charAt(0);
                            
                            if($last > $first)
                            {
                                $("#"+$hours2).data("occupied", $data + $temp);
                            }
                            else
                            {
                                $("#"+$hours2).data("occupied", $temp + $data);
                            }
                        }
                        else
                        {
                            $("#"+$hours2).data("occupied", $data);
                        }
                        $string = $info + "|" + $data + "|" + $hoursSave;
                        
                        if (typeof $("#"+$hours2).data('info') !== 'undefined') {
                            $temp = $("#"+$hours2).data("info");
                            $("#"+$hours2).data("info",  $temp + "&" + $string);
                        }
                        else{
                            $("#"+$hours2).data("info", $string);
                        }
                    }
                    
                    $pos = $hours.indexOf('.');
                    let $data = $hours.substring($pos + 1 );
                    $hours = $hours.substring(0, $pos);
                    $string = $info + "|" + $data + "|" + $hoursSave;
                    
                    if (typeof $("#"+$hours).data('occupied') !== 'undefined') {
                        $temp = $("#"+$hours).data("occupied");
                        $last = $temp.substr($temp.length - 1);
                        $first = $data.charAt(0);
                        
                        if($last > $first)
                        {
                            $("#"+$hours).data("occupied", $data + $temp);
                        }
                        else
                        {
                            $("#"+$hours).data("occupied", $temp + $data);
                        }
                    }
                    else
                    {
                        $("#"+$hours).data("occupied", $data);
                    }
                    
                    if (typeof $("#"+$hours).data('info') !== 'undefined') {
                        $temp = $("#"+$hours).data("info");
                        $("#"+$hours).data("info",  $temp + "&" + $string);
                    }
                    else{
                        $("#"+$hours).data("info", $string);
                    }
                    
        	    });
        	    markCells();
        	},
        	error: function(err){
        		console.log(err);
        	}
        });
}

function markCells(){
     $('#horario tr').each(function () {
        $(this).find('td input').each(function () {
             $id = "#" + $(this).attr('id');
             if (typeof $($id).data('occupied') !== 'undefined') {
                 /* $tam = $($id).data("occupied").length;
				 
				 if ( $tam >= 6)
                 {
                     $($id).addClass("occupied");
                 }
                 else if ($tam >= 1)
                 {
                     $($id).addClass("semiOccupied");
                 }
				 console.log($id + " " + $tam);*/
				 
				 let occupiedHoursString = $($id).data("occupied");
				let occupiedHoursSperated = occupiedHoursString.split('-');
				//console.log("Separacion string",occupiedHoursString,occupiedHoursSperated);
				let positionsHours = [0,0,0,0];
				for (let i = 0; i < occupiedHoursSperated.length; i++)
				{
					let currentHour = occupiedHoursSperated[i];
					if (currentHour.length>=2)
					{
						//console.log("son dobles");
						for (let j=0; j <currentHour.length; j++ )
						{
						    let number = currentHour[j];
						    positionsHours[number] = 1;
						}
						/*let number1 = parseInt(currentHour[0]);
						let number2 = parseInt(currentHour[1]);
						//console.log("son dobles",number1,number2);
						positionsHours[number1] = 1;
						positionsHours[number2] = 1;*/
					}
					else
					{
						//console.log("es uno");
						let number = parseInt(currentHour);
						//console.log("es uno,",number);
						positionsHours[number] = 1;
					}
				}

				let $tam = positionsHours[0]+positionsHours[1]+positionsHours[2]+positionsHours[3];

				if ( $tam >= 4)
				{
					$($id).addClass("occupied");
				}
				else if ($tam >= 1)
				{
					$($id).addClass("semiOccupied");
				}
             }
             else
             {
                 $($id).removeClass("occupied");
                 $($id).removeClass("semiOccupied");
             }
        });
    });  
}

function cleanCells(){
     $('#horario tr').each(function () {
        $(this).find('td input').each(function () {
            $id = "#" + $(this).attr('id');
            if (typeof $($id).data('occupied') !== 'undefined') {
                 $($id).removeData('occupied');
            }
             
             if (typeof $($id).data('info') !== 'undefined') {
                $($id).removeData('info');
        	}
        });
    });  
}
	
$( document ).ready(function() {
	reload_weeks();
	
	// Loop through each nav item
	$('nav.navbar').children('ul.nav').children('li').each(function(indexCount){
		
		// loop through each dropdown, count children and apply a animation delay based on their index value
		$(this).children('ul.dropdown').children('li').each(function(index){
			
			// Turn the index value into a reasonable animation delay
			var delay = 0.1 + index*0.03;
			
			// Apply the animation delay
			$(this).css("animation-delay", delay + "s")			
		});
	});
});

$("#arrow-left").on('click', function(event){
	event.preventDefault(); 
	let jsonToSend ={
							"action"   : "SUBSTRACTWEEK"
					};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "PUT",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			reload_weeks();
		},
		error: function(err){
			console.log(err);
		}
	});					
});

$("#arrow-right").on('click', function(event){
	event.preventDefault(); 
	let jsonToSend ={
							"action": "ADDWEEK"
					};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "PUT",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			reload_weeks();
		},
		error: function(err){
			console.log(err);
		}
	});					
});

$("#logout").on('click', function(event){
	event.preventDefault(); 
	let jsonToSend ={
							"action": "LOGOUT"
					};
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
		    console.log(data);
			window.location.href = "../index.html";
		},
		error: function(err){
			console.log(err);
		}
	});					
});

$('#saveEvent').on('click', function(event){
	event.preventDefault(); //evita que se haga el action y onSubmit
	validateForm2R();
})

$('#saveEventD').on('click', function (event) {
    event.preventDefault(); //evita que se haga el action y onSubmit
    validateForm2R_D();
})

function validateForm2R_D() {
    let dateA = $("#DateAD").val();
    let hourS = $("#HourD").val();       //"18.0"
    let hourI = parseInt(hourS.substring(0, hourS.indexOf('.'))) + 1; //18

    if(hourS != "0" && dateA != "")
	{
        let duration = $("#DurationD").val(); //minutes duration
        let description = $("#DescriptionD").val();
        let weeks = $("#WeeksD").val();
    
        let temp = new Date(dateA);
        var weekday = ["lu", "ma", "mi", "ju", "vi", "sa", "do"];
        let day = weekday[temp.getDay()];
    
        let nextHour = hourS.substr(hourS.length - 1);  ///0, 1, 2, 3
        let second = false;
        let iR2 = "0";
        let iR = "0";
        let tempHour = day + hourS;
    
        for (; iR < duration; iR = nextChar(iR)) {
            if (nextHour == "3") {
                nextHour = "0";
                second = true;
                tempHour = tempHour + "|" + day + hourI.toString() + "." + nextHour;
            }
            else {
                tempHour = tempHour + "-" + nextChar(nextHour);
                nextHour = nextChar(nextHour);
            }
    
        }
        console.log(tempHour);
    
        let jsonToSend = {
            "toUser": SearchResult,
            "weeks": weeks,
            "hours": tempHour,
            "description": description,
            "dateE": dateA,
            "action": "CREATEAPPOINTMENT"
        };
        $.ajax({
            url: "../data/applicationLayer.php",
            type: "POST",
            data: jsonToSend,
            ContentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $(".modalA-bodyD").addClass("hiddenElement");
    			$("#resultsEventD").removeClass("hiddenElement");
                
                let $tempButton = $("#resultsEventD").html();
                let $contentTemp ="<br><br><br><br><br><br><br><br><br>";
                
    			$.each(data, function (key, value ) {
                    $contentTemp += `<br>${key}<==>${value["status"]}`
                });//parseInt() .toString() 
                
                $("#resultsEventD").html($contentTemp + "<br>" + $tempButton);

                modal.style.display = "none";
                modalA.style.display = "none";
                modalD.style.display = "none";
                reload_weeks_D(SearchResult);
                reload_weeks();
            },
            error: function (err) {
                console.log(err);
                $("#errorAddEventD").html(err.statusText);
            }
        });
	}
	else
	{
	    $("#errorAddEventD").html("Please fill the data");
	}
}

function validateForm2R(){
	let dateA = $("#DateA").val();
	let hourS = $("#Hour").val();       //"18.0"
	let hourI = parseInt(hourS.substring(0, hourS.indexOf('.'))) + 1; //18
	
	if(hourS != "0" && dateA != "")
	{
	    
    	let duration = $("#Duration").val(); //minutes duration
    	let description = $("#Description").val();
    	let weeks = $("#Weeks").val();
        
        let temp = new Date(dateA);
        var weekday = ["lu","ma","mi","ju","vi","sa","do"];
        let day = weekday[temp.getDay()];
        
        let nextHour = hourS.substr(hourS.length - 1);  ///0, 1, 2, 3
        let second = false;
        let iR2 = "0";
        let iR = "0";
        let tempHour = day + hourS;
        
        for(; iR<duration; iR = nextChar(iR))
        {
            if(nextHour == "3")
            {
                nextHour = "0";
                second = true;
                tempHour = tempHour + "|" + day + hourI.toString() + "." + nextHour;
            }
            else
            {
                tempHour= tempHour + "-" + nextChar(nextHour);
                nextHour = nextChar(nextHour);
            }
            
        }
        console.log(tempHour);
    
        let jsonToSend ={       "toUser" : "Myself",
                                "weeks"  : weeks,
                                "hours"  : tempHour,
                                "description" : description,
                                "dateE"   : dateA,
    							"action": "CREATEAPPOINTMENT"
    					};
    	$.ajax({
    		url : "../data/applicationLayer.php",
    		type : "POST",
    		data : jsonToSend,
    		ContentType : "application/json",
    		dataType : "json",
    		success: function(data){
    			console.log(data);
    			reload_weeks(); //resultsEvent  modalA-body
    			$(".modalA-body").addClass("hiddenElement");
    			$("#resultsEvent").removeClass("hiddenElement");
    			
    			let $contentTemp ="<br><br><br><br><br><br><br><br><br>";
    			$.each(data, function (key, value ) {
                    $contentTemp += `<br>${key}<==>${value["status"]}`
                });//parseInt() .toString() 
                
                $("#resultsEvent").html($contentTemp);
    			
    			modal.style.display = "none";
                modalD.style.display = "none";
                modalAD.style.display = "none";
    		},
    		error: function(err){
    			console.log(err);
    			$("#errorAddEvent").html(err.statusText);
    		}
    	});	
	}
	else
	{
	    $("#errorAddEvent").html("Please fill the data");
	}
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

var idDate = "";

function ajax1($hoursT, $username, $comment) {
    // NOTE:  This function must return the value 
    //        from calling the $.ajax() method.
     let jsonToSend ={   "username" : $username,
                                    "action": "GETINFOFROMUSER"
            					};
    $.ajax({
            		url : "../data/applicationLayer.php",
            		type : "GET",
            		data : jsonToSend,
            		ContentType : "application/json",
            		dataType : "json",
            		success: function(dataAjax){
            			console.log(data);
            			
            			let $min = "";
            			arrayMin = $hoursT.split('-');
                        $.each( arrayMin, function() {
                            $min = $min + "  :" + (parseInt(this) * 15).toString();
                        });//parseInt() .toString() 
                                        
            			$content = $content + ` ${dataAjax.fname}  ${dataAjax.lname}<br>
                                        ${$min} <br>
                                        UserName: ${$username} <br>
                                        Mail: ${dataAjax.mail} <br>
                                        Comment: ${$comment} <br><br>`;
                        $(".modal-body").html($content);
                        return $content;
            		},
            		error: function(err){
            			console.log(err);
            			 return "";
            		}
    });	
}

$(".scheduleButton").on('click', function(event){
	event.preventDefault(); 
	$idCell = $(this).attr("id");
	$valCell = $(this).val();
	
	$(".min0").removeClass("selectedMin");
	$(".min1").removeClass("selectedMin");
	$(".min2").removeClass("selectedMin");
	$(".min3").removeClass("selectedMin");
	$(".min0").removeClass("occupied");
	$(".min1").removeClass("occupied");
	$(".min2").removeClass("occupied");
	$(".min3").removeClass("occupied");
	$(".min0").addClass("free");
	$(".min1").addClass("free");
	$(".min2").addClass("free");
	$(".min3").addClass("free");
	
	if (typeof $(".min0").data('Hours') !== 'undefined') 
        $(".min0").removeData('Hours');
    if (typeof $(".min1").data('Hours') !== 'undefined') 
        $(".min1").removeData('Hours');
    if (typeof $(".min2").data('Hours') !== 'undefined') 
        $(".min2").removeData('Hours');
    if (typeof $(".min3").data('Hours') !== 'undefined') 
        $(".min3").removeData('Hours');
	
	$(".modal-headerH").html($valCell);
	$content = "<br>";
	let $flag = false;
	
	if (typeof $("#"+$idCell).data('info') !== 'undefined') {
        $info = $("#"+$idCell).data("info");
        array = $info.split('&');
        
        $.each( array, function() {
            $data = this.split('|');
            
            
            if($data[0] !== "Myself" && $data[0] !== "OWN")
            {   
                $hoursT = $data[2];
                $.when(ajax1($hoursT, $data[0], $data[1])).done(function(a1){
                });
            }
            else
            {
                let $min = "";
            			arrayMin = $data[2].split('-');
                        $.each( arrayMin, function() {
                            $min = $min + "  :" + (parseInt(this) * 15).toString();
                        });//parseInt() .toString() 
                
                $content = $content + ` User:  ${$data[0]} <br>
                                        ${$min} <br>
                                        Comment: ${$data[1]} <br><br>`;
                $(".modal-body").html($content);
                
            }
           
            $hours = $data[2].split('-');
            
            $.each( $hours, function() {
                console.log(String(this));
                $actual = ".min" + String(this); 
                $($actual).removeClass("free");
                $($actual).addClass("occupied");
                
                if(typeof $data[4] === 'undefined') {
                    $($actual).data("Hours", $data[3]);
                }
                else {
                    $($actual).data("Hours", $data[3] + "|" + $data[4]);
                }
            });
        });
	}
	else
	{
	    $content = `<br> No Appointments <br><br>`;
	    $(".modal-body").html($content);
	}
	$hour = $idCell.match(/\d+/); 
	$(".min0").html(`${$hour}:00`)
	$(".min1").html(`${$hour}:15`)
	$(".min2").html(`${$hour}:30`)
	$(".min3").html(`${$hour}:45`)

	
	//modal.style.display = "block";
	let idTable = $(this).attr('id');
	idTable = idTable.charAt(0)
	if (idTable == 'D')
		modalD.style.display = "block";
	else
		modal.style.display = "block";
	
	let squareID = $(this).attr('id');
	firtLetter = squareID.charAt(0);
	if (firtLetter == 'D')
	{
		squareID = squareID.substr(0,3);
		let idTemp = $(this).attr('id');
		window.idDate = idTemp.substr(1,idTemp.length);
	}
	else
	{
		squareID = squareID.substr(0,2);
		window.idDate= $(this).attr('id');
	}
		
	
	let date = $('#'+squareID).html();
	//console.log(date);
	let dateSmall = date.replace("<br>"," ");
	$('.DateSelected').html(dateSmall);
});

$('.minButton').on('click',function(event){
	event.preventDefault(); 
	$(".min0").removeClass("selectedMin");
	$(".min1").removeClass("selectedMin");
	$(".min2").removeClass("selectedMin");
	$(".min3").removeClass("selectedMin");
	
	let classOfButton = $(this).attr('class');
	let currentButton = classOfButton.substr(0,4);

	//console.log(currentButton);
	$("." + currentButton).addClass("selectedMin");
	
	let currentPage = $('.selected').attr('id');
	let ToUser = 'Myself';
	if(currentPage === 'information')
		ToUser = SearchResult;

	let currentButtonNumber = currentButton.replace('min','');
	let idDateFinal = idDate+'.'+currentButtonNumber;
	
	let DateApp = $('.DateSelected').html();
	DateApp = DateApp.substr(DateApp.indexOf(" ")+3,DateApp.length  - DateApp.indexOf(" "));

    let $HoursTable = ($("." + currentButton).data("Hours"));

	
	if (typeof $("." + currentButton).data('Hours') !== 'undefined') {  ///THERE'S ALREADY AN APPOINTMENT

        if (ToUser == "Myself")
		    console.log(CancelAppointment($HoursTable));
	}
    else { //IT'S FREE REAL STATE
        if (ToUser === "Myself")
            CreateAppointmentByCell(DateApp, ToUser, idDateFinal);
        else
            CreateAppointmentByCell_D(DateApp, ToUser, idDateFinal);
	}
});

function CancelAppointment(c) {
    $(".modal-body").addClass("hiddenElement");
    $(".modal-body-Cancel").removeClass("hiddenElement");

    return c;
}

function CreateAppointmentByCell(DateApp, ToUser, idDate) {
    event.preventDefault(); 
    idDate = idDate.substring(2, idDate.length);
    
    $('#DateA').val(DateApp);
    $('#Hour').val(idDate);
    
    modalA.style.display = "block";
    modal.style.display = "none";
}

function CreateAppointmentByCell_D(DateApp, ToUser, idDate) {
    event.preventDefault();
    idDate = idDate.substring(2, idDate.length);

    $('#DateAD').val(DateApp);
    $('#HourD').val(idDate);

    modalAD.style.display = "block";
    modalD.style.display = "none";
}

$("#MyAppointmentButton").on('click', function(event){
	event.preventDefault(); 
	modalA.style.display = "block";
});

$(".ConfirmDelete").on('click', function(event){
	event.preventDefault(); 

	let $HourtoDelete;
	let DateApp = $('.DateSelected').html();
	DateApp = DateApp.substr(DateApp.indexOf(" ")+3,DateApp.length  - DateApp.indexOf(" "));

	if ($(".min0").hasClass("selectedMin" ))
	    $HourtoDelete = ($(".min0").data('Hours'))
	else if ($(".min1").hasClass("selectedMin" ))
	    $HourtoDelete = ($(".min1").data('Hours'))
	else if ($(".min2").hasClass("selectedMin" ))
	    $HourtoDelete = ($(".min2").data('Hours'))
	else if ($(".min3").hasClass("selectedMin" ))
	    $HourtoDelete = ($(".min3").data('Hours'))
	modal.style.display = "none";
	
	console.log(DateApp);
	console.log($HourtoDelete);
	
	let jsonToSend ={       "datetoDel" : DateApp,
	                        "hour" : $HourtoDelete,
							"action": "CANCELAPPOINTMENT"
					};
					
	$.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){
			console.log(data);
			reload_weeks();
		},
		error: function(err){
			console.log(err);
		}
	});	
	$(".min0").removeClass("selectedMin");
	$(".min1").removeClass("selectedMin");
	$(".min2").removeClass("selectedMin");
	$(".min3").removeClass("selectedMin");
	$(".modal-body").removeClass("hiddenElement");
    $(".modal-body-Cancel").addClass("hiddenElement");
});

$(".ConfirmCancel").on('click', function(event){
	event.preventDefault(); 
    $(".min0").removeClass("selectedMin");
	$(".min1").removeClass("selectedMin");
	$(".min2").removeClass("selectedMin");
	$(".min3").removeClass("selectedMin");
	$(".modal-body").removeClass("hiddenElement");
    $(".modal-body-Cancel").addClass("hiddenElement");
});




var map= null;

function mapOperation(address){
	var ubicacion = address;
	/**
	 * Moves the map to display over Berlin
	 *
	 * @param  {H.Map} map      A HERE Map instance within the application
	 */
	function moveMapToMty(map) {
		map.setCenter({ lat: 25.6923, lng: -100.3170 });
		map.setZoom(10);
	}

	/**
	 * Boilerplate map initialization code starts below:
	 */

	//Step 1: initialize communication with the platform
	var platform = new H.service.Platform({
		app_id: 'liaoE0Q8KlCYJKO5643L',
		app_code: 'ActAFDFOuvuZHdXxi2YFEg',
		useHTTPS: true
	});

	var targetElement = document.getElementById('mapContainer');
	var pixelRatio = window.devicePixelRatio || 1;
	var defaultLayers = platform.createDefaultLayers({
		tileSize: pixelRatio === 1 ? 256 : 512,
		ppi: pixelRatio === 1 ? undefined : 320
	});

	//Step 2: initialize a map  - not specificing a location will give a whole world view.
		map = new H.Map(document.getElementById('map'),
			defaultLayers.normal.map, { pixelRatio: pixelRatio });
			
        //Step 3: make the map interactive
    	// MapEvents enables the event system
    	// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
	var ui = H.ui.UI.createDefault(map, defaultLayers);

	// Create the parameters for the geocoding request:
	var geocodingParams = {
		searchText: ubicacion
	};

	// Define a callback function to process the geocoding response:
	var onResult = function (result) {
		var locations = result.Response.View[0].Result,
			position,
			marker;
		// Add a marker for each location found
		for (i = 0; i < locations.length; i++) {
			position = {
				lat: locations[i].Location.DisplayPosition.Latitude,
				lng: locations[i].Location.DisplayPosition.Longitude
			};
			marker = new H.map.Marker(position);
			map.addObject(marker);
		}
	};

	// Get an instance of the geocoding service:
	var geocoder = platform.getGeocodingService();

	// Call the geocode method with the geocoding parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	geocoder.geocode(geocodingParams, onResult, function (e) {
		alert(e);
	});

	// Now use the map as required...
	moveMapToMty(map);
}


// Get the modal
var modal  = document.getElementById('myModal');
var modalA = document.getElementById('myModalA');
var modalD = document.getElementById('myModalD');
var modalAD = document.getElementById('myModalAD');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanA = document.getElementsByClassName("close")[1];
var spanD = document.getElementsByClassName("closeD")[0];
var spanAD = document.getElementsByClassName("closeD")[1];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    resetHidden();
}

spanA.onclick = function() {
    modalA.style.display = "none";
    $(".modalA-body").removeClass("hiddenElement");
    $("#resultsEvent").addClass("hiddenElement");
    resetHidden();
}

spanAD.onclick = function () {
    modalAD.style.display = "none";
    $(".modalA-bodyD").removeClass("hiddenElement");
    $("#resultsEventD").addClass("hiddenElement");
    resetHidden();
}

spanD.onclick = function() {
	modalD.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetHidden();
    }
    if (event.target == modalA) {
        modalA.style.display = "none";
        $(".modalA-body").removeClass("hiddenElement");
    	$("#resultsEvent").addClass("hiddenElement");
        resetHidden();
    }
    if (event.target == modalD) {
        modalD.style.display = "none";
        resetHidden();
    }
    if (event.target == modalAD) {
        modalAD.style.display = "none";
        $(".modalA-bodyD").removeClass("hiddenElement");
    	$("#resultsEventD").addClass("hiddenElement");
        resetHidden();
    }
}

function resetHidden(){
    $(".modal-body").removeClass("hiddenElement");
    $(".modal-body-Cancel").addClass("hiddenElement");
}

window.setInterval(function(){
  reload_weeks();
}, 5000);
;(function($){
  
function clickHandler() {
    $(this).parents('.buton-cover').toggleClass('is_active');
}

$('.btn').on('click', clickHandler);

}(jQuery));



function infoSectionShow($search)
{
	let jsonToSend ={
		"user"   : $search,
		"action"  : "GETSEACHDATA"
	};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(data){

			console.log(data);


			//Remove the class selected from the <li>
			$('.selected').removeClass('selected');	
			//Add the class selected
			$('#information').addClass('selected');

			$('main > section').addClass('hiddenElement');

			$('#information').removeClass('hiddenElement');
			$('#informationSection').removeClass('hiddenElement');


			let newHTML = '';
			if(typeof(data.title) == 'undefined')
			{
				newHTML = `
					<legend> ${data.fname} ${data.lname}</legend>
					E-Mail : ${data.mail}
					<br>
					Country : ${data.country}
					<br>
					`;
				$('#informationHeader').html('Client Information');
			}

			else
			{
				$('#informationHeader').html('Profesional Information');
				newHTML = `
					<legend> ${data.fname} ${data.lname}</legend>
					Tittle : ${data.title}
					<br>
					Speciality : ${data.speciality}
					<br>
					Clinic : ${data.clinic}
					<br>
					E-Mail : ${data.mail}
					<br>
					Country : ${data.country}
					<br>
					Services : ${data.services}
					<br>
					Address: ${data.address}
					`;
					$('#map').removeClass('hiddenElement');
					let tempAddress = "Mexico, Nuevo León, Monterrey, Esparta ,3212"

					mapOperation(data.address);
			}



			$('#infomationFieldset').html(newHTML);
			window.SearchResult = data.user;
			let userSearch = window.SearchResult;
			reload_weeks_D(userSearch);
		},
		error: function(err){
			console.log(err);
			//$(".addrequest").text(err);
		}
	});
};

$('.friendInfo').on('click',function(event){
	event.preventDefault();
	//console.log($(this).val());
	infoSectionShow($(this).val());
});



function dataFromUser(search,i)
{
    i = i -1;

	let jsonToSend ={
		"search" : search,
		"action" : "SEARCHUSERD"
	};

	$.ajax({
		url : "../data/applicationLayer.php",
		type : "GET",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(data){
			$('#friend'+(i+1)).val(search);
			let newHTML = `<br>
						Name : ${data.fName} ${data.lName} 
						<br>
						E-Mail : ${data.mail}
						<br><br>`;
			$('#friend'+(i+1)).html(newHTML);
			$('#friend'+(i+1)).removeClass('hiddenElement');
			
			$('.friendL'+(i+1)).attr("id", search);
			$('.friendL'+(i+1)).html(data.fName  + data.lName);
			$('.friendL'+(i+1)).removeClass("hiddenElement");
		},
		error : function(error){
			console.log(error);
			thisUser = error;
		}
	});
}


$('#submitFormUpdate').on('click',function(event){
	event.preventDefault();
	
	let name = $("#NameR").val();
	let lname = $("#LNameR").val();
	let user = $("#UserNameR").html();
	user = user.substr(4,user.length - 4);
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
	
	let userType;
	
	if (service1 == '')
	    userType = 'p';
	else
	    userType = 'd';
	
	let flag =  true;
    let cambioContrasena = '0';
	if (pswd != pswdR)
    {
        flag = false;
        alert("Your passwords are not equal");
    }
    else
        if (pswd != '')
            cambioContrasena = '1';
	
	
	
	if (flag)
	{
	    
	    services = service1 + ','+service2 + ','+service3 + ','+service4 ;
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
					"services": services,
					"userType": userType,
					"pay":pay,
					"cambioPSW":cambioContrasena,
					"action"   : "UPDATEUSER"
				};
				
		console.log("json",jsonToSend);
		$.ajax({
    		url : "../data/applicationLayer.php",
    		type : "PUT",
    		data : jsonToSend,
    		ContentType : "application/json",
    		dataType : "json",
    		success : function(data){
	            alert("Your information was succefully updated");
    		},
    		error : function(error){
    			console.log(error);
    			alert("Something went wrong, try it later");
		    }
	    });
	}

					
    
    
});