function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

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
    document.getElementById("current_user").innerHTML = getCookie("currentUser");
    document.getElementById("currentUser").innerHTML = getCookie("currentUser");
    AjaxReq(loadProfile);
});

function loadProfile(res){
	console.log("Form Loaded!!!!");
}
function AjaxReq(callback){
	var xhr = new XMLHttpRequest();
	xhr.open("GET","status?value=profile&user=" + getCookie("currentUser"));
	xhr.onreadystatechange = function(){
		if(this.status == 404 && this.readyState == 4){
			callback(this);
		}
	}
	xhr.send();
}