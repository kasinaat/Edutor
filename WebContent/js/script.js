document.getElementById("login_link").addEventListener("click", function () {
    AjaxReq("add.html", renderLogin);
});
document.getElementById("signup_link").addEventListener("click", function () {
    AjaxReq("signup.html", renderSign);
});
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
window.addEventListener("load",function(){
	var user = getCookie("currentUser");
	if(user){
		window.location.href="dashboard.html";
	}
});
function renderLogin(result, fileName) {
    document.getElementById("content-holder").innerHTML = result.responseText;
    document.getElementById('msform').addEventListener("submit",function(){
    	var username = document.getElementById("username").value;
    	var password = document.getElementById("pass").value;
    	if(username === "" || username == null || username === undefined){
    		document.getElementById("usernameAlert").innerText = "Please enter username!";
    		e.preventDefault();
    	} else {
    		document.getElementById("usernameAlert").innerText = "";
    	}
    	if(password === "" || password === null || password === undefined){
    		document.getElementById("passAlert").innerText = "Please enter password!";
    		e.preventDefault();
    	} else {
    		document.getElementById("passAlert").innerText = "";
    	}
    });
}
function renderSign(result){
	document.getElementById("content-holder").innerHTML = result.responseText;
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to pre quick multi-click glitches

	$(".next").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'transform': 'scale('+scale+')'});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing
			easing: 'easeInOutBack'
		});
	});
	var usernameFlag = false;
	var emailFlag = false;
	var mobileFlag = false;
	document.getElementById("username").addEventListener("blur",function(){
		var username = document.getElementById("username").value;
		var xhr = new XMLHttpRequest();
		xhr.open("GET","profile?user="+username);
		xhr.onreadystatechange = function(){
			if(this.status == 404 && this.readyState == 4){
				document.getElementById("usernameAlert").innerText = "Username Already Taken!!";
			}
			if(this.status == 200 && this.readyState == 4){
				document.getElementById("usernameAlert").innerText = "";
				usernameFlag = true;
			}
		};
		xhr.send();
	});
	document.getElementById("email").addEventListener("blur",function(){
		var email = document.getElementById("email").value;
		var xhr = new XMLHttpRequest();
		xhr.open("GET","profile?email="+email);
		xhr.onreadystatechange = function(){
			if(this.status == 404 && this.readyState == 4){
				document.getElementById("emailAlert").innerText = "Mail ID Already Taken!!";
			}
			if(this.status == 200 && this.readyState == 4){
				document.getElementById("emailAlert").innerText = "";
				emailFlag = true;
			}
		};
		xhr.send();
	});
	document.getElementById("phone").addEventListener("blur",function(){
		var mobile = document.getElementById("phone").value;
		var xhr = new XMLHttpRequest();
		xhr.open("GET","profile?mobile="+mobile);
		xhr.onreadystatechange = function(){
			if(this.status == 404 && this.readyState == 4){
				document.getElementById("mobileAlert").innerText = "Mobile already registered";
			}
			if(this.status == 200 && this.readyState == 4){
				document.getElementById("mobileAlert").innerText = "";
				mobileFlag = true;
			}
		};
		xhr.send();
	});
	document.getElementById("msform").addEventListener("submit",function(e){
		var username = document.getElementById('username').value;
		var email = document.getElementById('email').value;
		var password = document.getElementById('pass').value;
		var cPass = document.getElementById('cpass').value;
		var fname= document.getElementById("fname").value;
		var lname= document.getElementById("lname").value;
		var mobile= document.getElementById("phone").value;
		var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
		var mobileRegex = /^[0-9]{10}$/;
		if(username === "" || username === null || username === undefined){
			document.getElementById("usernameAlert").innerText = "Please enter username!";
    		e.preventDefault();
		} else{
			document.getElementById("usernameAlert").innerText = "";
		}
		if(usernameFlag == false){
			document.getElementById("usernameAlert").innerText = "Username not available!";
    		e.preventDefault();
		}
		else{
			document.getElementById("usernameAlert").innerText = "";
		}
		if(password === "" || password === null || password === undefined){
			document.getElementById("passAlert").innerText = "Please enter password!";
    		e.preventDefault();
		} else{
			document.getElementById("passAlert").innerText = "";
		}
		if(cPass != password){
			document.getElementById("cpassAlert").innerText = "Passwords don't match";
			e.preventDefault()
		}
		else{
			document.getElementById("cpassAlert").innerText = "";
		}
		if(!emailRegex.test(email)){
		    document.getElementById("emailAlert").innerHTML = "enter a valid email";
		    e.preventDefault();
		} else{
			document.getElementById("emailAlert").innerHTML = "";
		} 
		if(emailFlag == false){
			document.getElementById("emailAlert").innerText = "Email already registered!!";
    		e.preventDefault();
		}
		else{
			document.getElementById("emailAlert").innerText = "";
		}
		
		if(fname === "" || fname === null ||fname === undefined){
			document.getElementById("fnameAlert").innerText = "Please enter first name";
			e.preventDefault();
		}
		else{
			document.getElementById("fnameAlert").innerText = "";
		}
		if(lname === "" || lname === null || lname === undefined){
			document.getElementById("lnameAlert").innerText = "Please enter last name";
			e.preventDefault();
		}
		else{
			document.getElementById("lnameAlert").innerText = "";
		}
		if(!mobileRegex.test(mobile)){
			document.getElementById("mobileAlert").innerText = "Please enter Mobile Number!";
			e.preventDefault();
		}
		else{
			document.getElementById("mobileAlert").innerText = "";
		}
		if(mobileFlag == false){
			document.getElementById("mobileAlert").innerText = "Mobile no. already registered!!";
    		e.preventDefault();
		}
		else{
			document.getElementById("mobileAlert").innerText = "";
		}

	});

}
function AjaxReq(fileName, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileName);
    xhr.onreadystatechange = function (data) {
        if (this.status == 200 && this.readyState == 4) {
            callback(this, fileName);
        }
    };
    xhr.send();
}

