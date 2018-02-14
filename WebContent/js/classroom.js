$(document).ready(function() {
	$('button').click(function() {
		$('.sidebar').toggleClass('fliph');
	});
});
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.body.style.backgroundColor = "#fff";
}
function renderUserCourses(data) {
	console.log(data.responseText);
	var courseList = JSON.parse(data.responseText);
	var template = '<li> <a href="#" data-toggle="collapse" data-target="#{id}" class="collapsed active" > <i class="fa fa-th-large"></i> <span class="nav-label"> {courseTitle} </span> </a>\
	      				<ul class="sub-menu collapse" id="{id}">\
							{content}\
						  </ul>\
					</li>';
	var template2 = '<li><a href="#/{url}">{LessonName}</a></li>'
	for (let i = 0; i < courseList.length; i++) {
		var result = "";	
		
		result = template.replace("{id}", courseList[i].courseId).replace(
				"{id}", courseList[i].courseId).replace("{courseTitle}",
				courseList[i].courseTitle);
		console.log(result);
		let ajx = new XMLHttpRequest();
		
		ajx.open("GET","/edutor/course?value=media&cid="+courseList[i].courseId,async=false);
		ajx.onreadystatechange = function(){
			if(this.status == 200 && this.readyState == 4){
				var newResult="";
				var result2 = "";
				var mediaList = JSON.parse(this.responseText);
				for(let j=0;j<mediaList.length;j++){
					result2 += template2.replace("{url}",mediaList[j].url).replace("{LessonName}",mediaList[j].lessonName);
				}
				newResult += result.replace("{content}",result2);
				document.getElementById("courseList").innerHTML += newResult;
				console.log(newResult);
			}
			
		};
		ajx.send(); 
	}
}
window.addEventListener("hashchange",function(){
	var hash = window.location.hash;
	if(/^#\/[A-z0-9]+$/.test(hash)){
		var link = /[A-z0-9]+$/.exec(hash);
		console.log(link);
		var embed = '<iframe class="videoStyle" width="854" height="480" src="https://www.youtube.com/embed/{link}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		document.getElementById("content-holder").innerHTML = embed.replace("{link}",link[0]);
	}
	if (hash == "#/logout") {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/edutor/logout");
		xhr.send();
		window.location.href="/edutor";
		location.reload();
	}
});
window.addEventListener("load", function() {
	AjaxReq("/edutor/course?value=learn&uname=" + getCookie("currentUser"),
			renderUserCourses);
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