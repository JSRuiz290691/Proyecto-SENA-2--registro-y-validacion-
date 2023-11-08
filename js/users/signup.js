const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

window.addEventListener('DOMContentLoaded', event => {

    const btn = document.getElementById("btn_signup");

    function sendSignUp() {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
        var name_element = document.getElementById('name');
        var name = name_element.value;
        var lastname_element = document.getElementById("lastname")
        var lastname = lastname_element.value;
        var id_element = document.getElementById("id")
        var id = id_element.value;
        var email_element = document.getElementById("email");
        var email = email_element.value;
        var password_element = document.getElementById("password");
        var password = password_element.value;
        var role_element = document.getElementById("role");
        var role = role_element.value;

        fetch("http://localhost:3000/api/auth/signup", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                id: id,
                email: email,
                password: password,
                role: role
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            
            alert(json.message ); //envia mensaje que confirma la creacion del usuario
            console.log(json, 'json');
            location.href = '/index.html';
        } )
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignUp();
    });
});
