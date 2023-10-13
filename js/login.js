window.addEventListener('DOMContentLoaded', event => { // se agresa un listener cuando se carga el contenido de la pg

    const btn = document.getElementById("btn_signin");

    function sendSignIn() { //se crea la funcion que guarda los datos ingresados por el usuario en las respectivas variables 
        
        var email_element = document.getElementById("email");
        var email = email_element.value;
        var password_element = document.getElementById("password");
        var password = password_element.value;
        

        fetch("http://localhost:10000/api/auth/signin", { // mediante la funcion fetch y el metodo post se hace una recuest al servidor
            method: "POST",
            body: JSON.stringify({
                
                email: email,
                password: password
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json()) // se recibe la respuesta del sefvvidor con el status
        .then((json) => { //recibe los datos del servidor
            if (json.token) { //se verifica si la respuesta envia el token
                document.cookie = "name=" + json.user.name + " " + json.user.lastname; //se guardan los datos name y lastname en una cookie, para luego mostrarlos cuando se recargue la pg al iniciar seccion

                console.log(json, 'json');
                location.href ='index.html'; // recarga la pagina central con el nombre y apellido del usuario
            } else {
                alert(json.message); // muestra el mensaje que arroja luego de la validacion 
            }
        } )
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignIn();
    });
});
