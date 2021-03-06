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
var nav = false;
function toggleNav() {
	if (!nav) {
		document.getElementById("mySidenav").style.width = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		nav = true;
	} else{
		document.getElementById("mySidenav").style.width = "0";
		document.body.style.backgroundColor = "#fff";
		nav = false;
	}
}
var delete_cookie = function(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

window
		.addEventListener(
				"hashchange",
				function() {
					let hash = window.location.hash;
					let courseRegex = /^#\/[courses]+\/\d+$/;
					let learnRegex = /^#\/[courses]+\/[course]+\/\d+$/;
					if (hash == "#/signup") {
						AjaxReq("/edutor/signup.html", renderSign);
					} else if (courseRegex.test(hash)) {
						var id = /\d+$/.exec(hash);
						if (!getCookie("currentUser")) {
							window.location.hash = "#/login";
						} else {
							AjaxReq("/edutor/registercourse?cid=" + id[0]
									+ "&uname=" + getCookie("currentUser"),
									renderCourseLanding);
						}
					} else if (hash == "#/courses") {
						AjaxReq("/edutor/course?value=all", renderCourses);
					} else if (hash == "#/home" || hash == "") {
						document.getElementById("content-holder").innerHTML = "";
					} else if (hash == "/settings") {
						closeNav();
						var ajx = new XMLHttpRequest();
						ajx.open("GET", "setting.html");
						ajx.onreadystatechange = function() {
							if (this.readyState == 4 && this.status == 200) {
								document.getElementById("content").innerHTML = this.responseText;
							}
						};
						ajx.send();
					} else if (hash == "#/logout") {
						var xhr = new XMLHttpRequest();
						xhr.open("GET", "/edutor/logout");
						xhr.send();
						window.location.href = "/edutor";
						location.reload();
					} else if (hash == "#/settings") {
						AjaxReq("/edutor/setting.html", updateUserContent);
					}
				});
window.addEventListener("load", function() {
	window.location.hash = "";
});

function updateUserContent(data) {
	closeNav();
	document.getElementById("content-holder").innerHTML = data.responseText;
}
//
// window.addEventListener("load", function () {
// document.getElementById("content-holder").innerHTML = "";
// var user = getCookie("currentUser");
// if (user && window.location.href != "/edutor/dashboard") {
// window.location.href = "dashboard";
// }
// });
function renderCourseLanding(data) {
	alert("Course Registered Sucessfully!");
	window.location.href = "/edutor/clasroom";
}
if (document.getElementById("loginButton")) {
	document
			.getElementById('loginButton')
			.addEventListener(
					"click",
					function() {
						var loginFlag = true;
						var username = document.getElementById("username").value;
						var password = document.getElementById("pass").value;
						if (username === "" || username == null
								|| username === undefined) {
							document.getElementById("usernameAlert").innerText = "Please enter username!";
							e.preventDefault();
						} else {
							document.getElementById("usernameAlert").innerText = "";
							loginFlag = true;
						}
						if (password === "" || password === null
								|| password === undefined) {
							document.getElementById("passAlert").innerText = "Please enter password!";
							e.preventDefault();
						} else {
							document.getElementById("passAlert").innerText = "";
							loginFlag = true;
						}
						if (loginFlag) {
							let ajx = new XMLHttpRequest();
							ajx.open("GET", "/edutor/login?username="
									+ username + "&password=" + password);
							ajx.onreadystatechange = function() {
								if (this.status == 200 && this.readyState == 4) {
									if (username == "admin")
										window.location.href = "/edutor/admin";
									else
										window.location.href = "/edutor/dashboard";
								} else if (this.status == 404
										&& this.readyState == 4) {
									document.getElementById("errorBox").innerHTML = "Wrong credentials!";
								}
							};
							ajx.send();
						}
					});
}
function renderSign(result) {
	document.getElementById("content-holder").innerHTML = result.responseText;
	var current_fs, next_fs, previous_fs; // fieldsets
	var left, opacity, scale; // fieldset properties which we will animate
	var animating; // flag to pre quick multi-click glitches

	$(".next").click(
			function() {
				if (animating)
					return false;
				animating = true;

				current_fs = $(this).parent();
				next_fs = $(this).parent().next();

				// activate next step on progressbar using the index of next_fs
				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass(
						"active");

				// show the next fieldset
				next_fs.show();
				// hide the current fieldset with style
				current_fs.animate({
					opacity : 0
				}, {
					step : function(now, mx) {
						// as the opacity of current_fs reduces to 0 - stored in
						// "now"
						// 1. scale current_fs down to 80%
						scale = 1 - (1 - now) * 0.2;
						// 2. bring next_fs from the right(50%)
						left = (now * 50) + "%";
						// 3. increase opacity of next_fs to 1 as it moves in
						opacity = 1 - now;
						current_fs.css({
							'transform' : 'scale(' + scale + ')'
						});
						next_fs.css({
							'left' : left,
							'opacity' : opacity
						});
					},
					duration : 800,
					complete : function() {
						current_fs.hide();
						animating = false;
					},
					// this comes from the custom easing plugin
					easing : 'easeInOutBack'
				});
			});

	$(".previous").click(
			function() {
				if (animating)
					return false;
				animating = true;

				current_fs = $(this).parent();
				previous_fs = $(this).parent().prev();

				// de-activate current step on progressbar
				$("#progressbar li").eq($("fieldset").index(current_fs))
						.removeClass("active");

				// show the previous fieldset
				previous_fs.show();
				// hide the current fieldset with style
				current_fs.animate({
					opacity : 0
				}, {
					step : function(now, mx) {
						// as the opacity of current_fs reduces to 0 - stored in
						// "now"
						// 1. scale previous_fs from 80% to 100%
						scale = 0.8 + (1 - now) * 0.2;
						// 2. take current_fs to the right(50%) - from 0%
						left = ((1 - now) * 50) + "%";
						// 3. increase opacity of previous_fs to 1 as it moves
						// in
						opacity = 1 - now;
						current_fs.css({
							'left' : left
						});
						previous_fs.css({
							'transform' : 'scale(' + scale + ')',
							'opacity' : opacity
						});
					},
					duration : 800,
					complete : function() {
						current_fs.hide();
						animating = false;
					},
					// this comes from the custom easing
					easing : 'easeInOutBack'
				});
			});
	var usernameFlag = false;
	var emailFlag = false;
	var mobileFlag = false;
	document
			.getElementById("username")
			.addEventListener(
					"blur",
					function() {
						var username = document.getElementById("username").value;
						var xhr = new XMLHttpRequest();
						xhr.open("GET", "/edutor/profile?user=" + username);
						xhr.onreadystatechange = function() {
							if (this.status == 404 && this.readyState == 4) {
								document.getElementById("usernameAlert").innerText = "Username Already Taken!!";
							}
							if (this.status == 200 && this.readyState == 4) {
								document.getElementById("usernameAlert").innerText = "";
								usernameFlag = true;
							}
						};
						xhr.send();
					});
	document
			.getElementById("email")
			.addEventListener(
					"blur",
					function() {
						var email = document.getElementById("email").value;
						var xhr = new XMLHttpRequest();
						xhr.open("GET", "/edutor/profile?email=" + email);
						xhr.onreadystatechange = function() {
							if (this.status == 404 && this.readyState == 4) {
								document.getElementById("emailAlert").innerText = "Mail ID Already Taken!!";
							}
							if (this.status == 200 && this.readyState == 4) {
								document.getElementById("emailAlert").innerText = "";
								emailFlag = true;
							}
						};
						xhr.send();
					});
	document
			.getElementById("phone")
			.addEventListener(
					"blur",
					function() {
						var mobile = document.getElementById("phone").value;
						var xhr = new XMLHttpRequest();
						xhr.open("GET", "/edutor/profile?mobile=" + mobile);
						xhr.onreadystatechange = function() {
							if (this.status == 404 && this.readyState == 4) {
								document.getElementById("mobileAlert").innerText = "Mobile already registered";
							}
							if (this.status == 200 && this.readyState == 4) {
								document.getElementById("mobileAlert").innerText = "";
								mobileFlag = true;
							}
						};
						xhr.send();
					});
	document
			.getElementById("msform")
			.addEventListener(
					"submit",
					function(e) {
						var username = document.getElementById('username').value;
						var email = document.getElementById('email').value;
						var password = document.getElementById('pass').value;
						var cPass = document.getElementById('cpass').value;
						var fname = document.getElementById("fname").value;
						var lname = document.getElementById("lname").value;
						var mobile = document.getElementById("phone").value;
						var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
						var mobileRegex = /^[0-9]{10}$/;
						if (username === "" || username === null
								|| username === undefined) {
							document.getElementById("usernameAlert").innerText = "Please enter username!";
							e.preventDefault();
						} else {
							document.getElementById("usernameAlert").innerText = "";
						}
						if (usernameFlag == false) {
							document.getElementById("usernameAlert").innerText = "Username not available!";
							e.preventDefault();
						} else {
							document.getElementById("usernameAlert").innerText = "";
						}
						if (password === "" || password === null
								|| password === undefined) {
							document.getElementById("passAlert").innerText = "Please enter password!";
							e.preventDefault();
						} else {
							document.getElementById("passAlert").innerText = "";
						}
						if (cPass != password) {
							document.getElementById("cpassAlert").innerText = "Passwords don't match";
							e.preventDefault()
						} else {
							document.getElementById("cpassAlert").innerText = "";
						}
						if (!emailRegex.test(email)) {
							document.getElementById("emailAlert").innerHTML = "enter a valid email";
							e.preventDefault();
						} else {
							document.getElementById("emailAlert").innerHTML = "";
						}
						if (emailFlag == false) {
							document.getElementById("emailAlert").innerText = "Email already registered!!";
							e.preventDefault();
						} else {
							document.getElementById("emailAlert").innerText = "";
						}

						if (fname === "" || fname === null
								|| fname === undefined) {
							document.getElementById("fnameAlert").innerText = "Please enter first name";
							e.preventDefault();
						} else {
							document.getElementById("fnameAlert").innerText = "";
						}
						if (lname === "" || lname === null
								|| lname === undefined) {
							document.getElementById("lnameAlert").innerText = "Please enter last name";
							e.preventDefault();
						} else {
							document.getElementById("lnameAlert").innerText = "";
						}
						if (!mobileRegex.test(mobile)) {
							document.getElementById("mobileAlert").innerText = "Please enter Mobile Number!";
							e.preventDefault();
						} else {
							document.getElementById("mobileAlert").innerText = "";
						}
						if (mobileFlag == false) {
							document.getElementById("mobileAlert").innerText = "Mobile no. already registered!!";
							e.preventDefault();
						} else {
							document.getElementById("mobileAlert").innerText = "";
						}

					});

}
function renderCourses(data) {
	var courseList = JSON.parse(data.responseText);
	console.log(data.responseText);
	var container = document.getElementById("content-holder");
	var result = "";
	var resultTemplate = '<div id="products" class="list-group col-lg-12">{courses}</div>';
	var listCourseTemplate = '<div class="item col-xs-10 col-lg-4">\
        <div class="thumbnail">\
    <img class="group list-group-image" src="/edutor/images/instagram.png" alt="" />\
    <div class="caption">\
        <p class="group inner list-group-item-heading">\
           {CourseName}</p>\
        <div class="row">\
		<div class="col-md-3"></div>\
            <div class="col-xs-12 col-md-6">\
                <a class="btn btn-success btn-block" href="#/courses/{id}">Start Course</a>\
            </div>\
        </div>\
    </div>\
</div>\
</div>';
	console.log(courseList.length);
	for (var i = 0; i < courseList.length; i++) {
		result += listCourseTemplate.replace("{id}", courseList[i][0]).replace(
				"{CourseName}", courseList[i][1]).replace("{thumbnail}",
				courseList[i][2]).replace("{description}", courseList[i][3]);
	}
	console.log(result);
	resultTemplate = resultTemplate.replace("{courses}", result);
	console.log(resultTemplate);
	container.innerHTML = resultTemplate;
}
function AjaxReq(fileName, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", fileName);
	xhr.onreadystatechange = function(data) {
		if (this.status == 200 && this.readyState == 4) {
			callback(this, fileName);
		}
	};
	xhr.send();
}