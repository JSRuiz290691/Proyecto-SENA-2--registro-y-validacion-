window.addEventListener('DOMContentLoaded', event => {

    const btn = document.getElementById("btn_signup");

    function sendSignUp() {
        fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                username: document.getElementById("email").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                roles: ['admin', 'user']
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignUp();
    });
});