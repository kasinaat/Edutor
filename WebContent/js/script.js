document.getElementById("login_link").addEventListener("click", function () {
    AjaxReq("add.html", renderLogin);
});
document.getElementById("signup_link").addEventListener("click", function () {
    AjaxReq("signup.html", renderLogin);
});

function renderLogin(result, fileName) {
    document.getElementById("content-holder").innerHTML = result.responseText;
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
