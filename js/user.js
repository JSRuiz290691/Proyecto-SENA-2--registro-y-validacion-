window.addEventListener('DOMContentLoaded', event => {

    const btn = document.getElementById("btn_signup");

    /*fetch('http://localhost:5000/api/users',
    {
        headers:{
            'Access-Control-Allow-Origin': '*',
            'content-type':'application/json: charset=UTF-8'
        },
        method:'GET'
    })
    .then(data=>{return data.json()})
    .then(res=>{console.log(res)})
    .catch(error=>console.log(error));*/

    function sendSignUp() {
        fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                nombes: "Administrador",
                apellidos: "oficial",
                fechaNacimiento: "03/12/2023",
                documentoIdentidad: "987654",
                email: "adminVetO@gmail.com",
                password: "password",
                roles: ["admin"]
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(erro => console.log(error))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignUp();
    });
});
