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
document.get
document.getElementById("createCourse").addEventListener("click",function(){
	var name = document.getElementById("courseName").value;
	var description = document.getElementById("courseDesc").value;
	var ajx = new XMLHttpRequest();
	ajx.open("GET","addcourse?name="+name+"&desc="+description);
	document.getElementById("lessons").innerHTML = "<fieldset>\
			<legend>Lessons</legend>\
			<div class=\"form-group\">\
				<input type=\"text\" placeholder=\"Lesson Name\" class=\"form-control\" />\
				<span class=\"alert\" id=\"lessonAlert\"> </span>\
			</div>\
			<div class=\"form-group\">\
				<input type=\"number\" placeholder=\"Lesson Number\" class=\"form-control\" />\
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
				<input type=\"url\" placeholder=\"Video URL\" class=\"form-control\" />\
				<span class=\"alert\" id=\"urlAlert\"> </span>\
			</div>\
			<div class=\"form-group\">\
				<button id=\"nextVideo\" class=\"btn btn-primary\">Next Video</button>\
				<button id=\"finishCourse\" class=\"btn btn-success\">Finish</button>\
			</div>\
		</fieldset>"
});