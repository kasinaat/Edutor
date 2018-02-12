function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
var delete_cookie = function(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.body.style.backgroundColor = "#fff";
}
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
window.addEventListener("load",function(){
	window.location.hash = "";
});
window
		.addEventListener(
				'load',
				function() {
					var allCookies = document.cookie;
					if (getCookie("currentUser")) {
						document.getElementById("current_user").innerHTML = getCookie("currentUser");
						document.getElementById("currentUser").innerHTML = getCookie("currentUser");
					} else {
						window.location.href = "/edutor";
					}
				});
document.getElementById("logout_link").addEventListener("click", function() {
	delete_cookie("currentUser");
	window.location.href = "/edutor";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "logout");
	xhr.send();
});

function addCourseContent(){
	document.getElementById("nextVideo").addEventListener("click",function(){
		var lessonName = document.getElementById("lessonName").value;
		var lessonNumber = document.getElementById("lessonNumber").value;
		var mediaUrl = document.getElementById("videoUrl").value;
		var xhr = new XMLHttpRequest();
		xhr.open("GET","/edutor/course?value=addcontent&name="+localStorage.courseName+"&lname="+lessonName+"&lnum="+lessonNumber+"&url="+mediaUrl);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				bootbox.alert("Video Added to course!");
				document.getElementById("videoUrl").value="";
				document.getElementById("lessonNumber").value = "";
			}
		};
	});
	document.getElementById("finishCourse").addEventListener("click",function(){
		alert("Add course Completed!");
		location.reload();
	})
}
function addCourses(data) {
	document.getElementById("content").innerHTML = data;
	document
			.getElementById("createCourse")
			.addEventListener(
					"click",
					function(e) {
						var name = document.getElementById("courseName").value;
						var description = document.getElementById("courseDesc").value;
						var courseFlag;
						if (name === "" || name === null || name === undefined) {
							document.getElementById("courseNameAlert").innerHTML = "Field Required!";
							courseFlag = false;
							e.preventDefault();
						} else {
							document.getElementById("courseNameAlert").innerHTML = "";
							courseFlag = true;
						}
						if (description === "" || description === null
								|| description === undefined) {
							document.getElementById("courseDescAlert").innerHTML = "Field Required!";
							courseFlag = false;
						} else {
							document.getElementById("courseDescAlert").innerHTML = "";
							courseFlag = true;
						}
						if (courseFlag) {
							localStorage.courseName = name;
							var ajx = new XMLHttpRequest();
							ajx.open("GET", "/edutor/course?value=addcourse&name=" + name + "&desc="
									+ description);
							ajx.send();
							document.getElementById("content").innerHTML = "<fieldset>\
				<legend>Lessons</legend>\
				<div class=\"form-group\">\
					<input type=\"text\" id=\"lessonName\" placeholder=\"Lesson Name\" class=\"form-control\" />\
					<span class=\"alert\" id=\"lessonAlert\"> </span>\
				</div>\
				<div class=\"form-group\">\
					<input type=\"number\" id=\"lessonNumber\" placeholder=\"Lesson Number\" class=\"form-control\" />\
					<span class=\"alert\" id=\"lessonNumAlert\"> </span>\
				</div>\
				<div class=\"form-group\">\
					<select class=\"form-control\">\
						<option>\
							Video\
						</option>\
						<option>\
							Document\
						</option>\
					</select>\
					<span class=\"alert\" id=\"typeAlert\"> </span>\
				</div>\
				<div class=\"form-group\">\
					<input type=\"text\" placeholder=\"Video URL\" id=\"videoUrl\" class=\"form-control\" />\
					<span class=\"alert\" id=\"urlAlert\"> </span>\
				</div>\
				<div class=\"form-group\">\
					<button id=\"nextVideo\" class=\"btn btn-primary\">Next Video</button>\
					<button id=\"finishCourse\" class=\"btn btn-success\">Finish</button>\
				</div>\
			</fieldset>"
						}
						addCourseContent();
					});
}
document.getElementById("course_link").addEventListener("click", function() {
	closeNav();
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../addcourse.html");
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			addCourses(this.responseText);
		}
	};
	xhr.send();
});
