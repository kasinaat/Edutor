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
    for(var i = 0; i < ca.length; i++) {
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
window.addEventListener('load', function() {
    var allCookies = document.cookie;
    if(getCookie("currentUser")){
    	document.getElementById("current_user").innerHTML = getCookie("currentUser");
    	document.getElementById("currentUser").innerHTML = getCookie("currentUser");
    } else{
    	window.location.href="/edutor";
    }
});
document.getElementById("logout_link").addEventListener("click",function(){
	delete_cookie("currentUser");
	window.location.href="/edutor";
	var xhr = new XMLHttpRequest();
	xhr.open("GET","logout");
	xhr.send();
});
document.getElementById("setting_link").addEventListener("click",function(){
	closeNav();
	var ajx = new XMLHttpRequest();
	ajx.open("GET","setting.html");
	ajx.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("content").innerHTML = this.responseText;
		}
	};
	ajx.send();
});
function renderCourses(data) {
	var courseList = JSON.parse(data.responseText);
	console.log(data.responseText);
	var container = document.getElementById("content");
	var result = "";
	var resultTemplate = '<div id="products" class="list-group col-lg-12">{courses}</div>';
	var listCourseTemplate = '<div class="item col-xs-10 col-lg-4">\
        <div class="thumbnail">\
    <img class="group list-group-image" src="images/instagram.png" alt="" />\
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
		result += listCourseTemplate.replace("{id}",
				courseList[i][0]).replace("{CourseName}", courseList[i][1]).replace(
				"{thumbnail}", courseList[i][2]).replace("{description}",courseList[i][3]);
	}
	console.log(result);
	resultTemplate = resultTemplate.replace("{courses}",result);
	console.log(resultTemplate);
	container.innerHTML = resultTemplate;
}
document.getElementById("listCourses").addEventListener("click", function() {
	AjaxReq("course?value=all", renderCourses);
});
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
