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
        var rol_element = document.getElementById("rol");
        var rol = rol_element.value;

        fetch("http://localhost:10000/api/auth/signup", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                id: id,
                email: email,
                password: password,
                roles: [rol] 
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            alert("Usuario creado exitosamente"); //envia mensaje que confirma la creacion del usuario
            console.log(json, 'json');
        } )
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignUp();
    });
});
