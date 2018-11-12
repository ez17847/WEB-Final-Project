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
		
		console.log(data);
		let html = "";

		
		console.log(Object.keys(data).length);

		var obj = Object.keys(data).length;

		for (var i=0; i<obj; i++) {
		    console.log(data[i]);
		    var parts = data[i].split('&');

		    var sections = Object.keys(parts).length
		    var userO =  "";
		    var commentO =  "";

		    if( data == "")
		    {
		    	userO =  "NO COMMENTS";
		    }
		    else 
		    {
		    	var str1 =  parts[0];
		    	commentO = parts[1];
				var str2 = "User: ";
				var userO = str2.concat(str1);

				if( sections == '1')
			    {
			    	userO =  "Anonymus";
			    	commentO = parts[0];
			    }

			    html += `	<div class = "commentJQ">
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
		console.log(html);

		$('#commentsI').append(html);
	},
	error: function(err){
		console.log(err);
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
			console.log(data);

			let $newHtml = "";
			let $counter = 1;
			let $buttonhidden = $("#addFriend");

			$.each(data, function () {
				let $html = $(".request" + $counter);
				let $name = $("#nameR" + $counter);
				let $data = $("#userR" + $counter);

				console.log(".request" + $counter);
				console.log($html);

				$parts = this.split('|');
            	console.log($parts[0]); 
            	console.log($parts[1]);
            	console.log($parts[2]);

            	$name.text(`Name: ${$parts[0]}`);
            	$data.text(`${$parts[1]}  < - >  UserName: ${$parts[2]}`);

				$html.attr('id', $parts[2]);
				$html.removeClass("hiddenElement");
				$counter = $counter + 1;

            });
	},
	error: function(err){
		console.log(err);
	}
});

$('.acceptFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	console.log($search);

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
			console.log(data);
			//$("#addrequest" + $)
		},
		error: function(err){
			$(".acceptRequest").text(err);
			console.log(err);
		}
	});					

});

$('.rejectFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	console.log($search);

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
			console.log(data);
			//$("#addrequest" + $)
		},
		error: function(err){
			$(".acceptRequest").text(err);
			console.log(err);
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

							html = `	<div class = "commentJQ">
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

						console.log(user + " " + comment);
						$.ajax({
							url : "../data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success: function(data){
								console.log(data);
							},
							error: function(err){
								console.log(err);
							}
						});


					}
					else
					{
						console.log("EMPTY! ")
					}

				},
				error: function(err){
					console.log(err);
				}
		});
    }
})


$('#menu > li').on('click', function(event){
	//console.log($(this));
	let $currentElement = $(this);

	//Remove the class selected from the <li>
	$('.selected').removeClass('selected');	

	//Add the class selected to the clicked <li>
	$(this).addClass('selected');

	let currentId = $($currentElement).attr('id');
	//Append the word Section

	$('main > section').addClass('hiddenElement');

	$('#' + currentId + 'Section').removeClass('hiddenElement');
})

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
		console.log(data);
		let friendList;

		let friends = "NONE";
		if (data.friends != "")
		{
			friends = data.friends;
			friendList = friends.split('|');
			console.log(friendList);

			for (var i = 0; i < friendList.length; i++) 
			{
				let temp = friendList[i].trim();

				if (temp)
				{
					console.log(temp);
					html += `	<div class = "commentJQ">
							<span>${temp}</span>
							<br><br>
							</div>
							<br>
						`;
				}
			}
			$('#friendsI').append(html);
		}
		else
		{
			html = `	<div class = "commentJQ">
							<span>YOU HAVE NO FRIENDS</span>
							<br>SORRY...<br>
							</div>
							<br>
						`;
			$('#friendsI').append(html);
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
		}
		
		$('#mainProfileContent').html(newHtml);
		
	},

	error : function(err){
		alert(err.responseText);
		console.log(err);
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
			//console.log(data);
			let $newHtml = "";
			let $counter = 1;
			let $buttonhidden = $(".addFriend");

			$.each(data, function () {
				let $html = $(".comment" + $counter);
				let $name = $("#name" + $counter);
				let $data = $("#user" + $counter);

				console.log(".comment" + $counter);
				console.log($html);

				$parts = this.split('|');
            	console.log($parts[0]); 
            	console.log($parts[1]);
            	console.log($parts[2]);

            	$name.text(`Name: ${$parts[0]}`);
            	$data.text(`${$parts[1]}  < - >  UserName: ${$parts[2]}`);

				$html.attr('id', $parts[2]);
				$html.removeClass("hiddenElement");
				$counter = $counter + 1;

            });

		},
		error : function(error){
			console.log(error);
			error1.text("I FAILED YOU, MASTER...");
		}
	});
});


$('.addFriend').on('click', function(event){

	event.preventDefault(); //evita que se haga el action y onSubmit
	let $search = $(this).parent().attr('id');
	console.log($search);

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
			console.log(data);
			//$("#addrequest" + $)
		},
		error: function(err){
			console.log(err);
			$(".addrequest").text(err);
		}
	});					

});
