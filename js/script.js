document.getElementById("login-btn").addEventListener("click", function(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if(username === "admin" && password === "admin123"){
        window.location.assign("./dashboard.html");
    }
    else{
        alert("Invalid Credentials");
        return;
    }
});
document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
    document.getElementById("login-btn").click();
    }
});