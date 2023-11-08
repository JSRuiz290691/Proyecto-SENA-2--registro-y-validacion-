var name_element = document.getElementById('name');
var lastname_element = document.getElementById('lastname');
var id_element = document.getElementById('id');
var email_element = document.getElementById('email');
var password_element = document.getElementById('password');
var role_element = document.getElementById('role');

function getUser(user_id) {
    fetch("http://localhost:3000/api/users/" + user_id, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json, 'json');
        name_element.value = json.name;
        lastname_element.value = json.lastname;
        id_element.value = json.id;
        email_element.value = json.email;
        role_element.value = json.role.name;
    })
    .catch(error => console.log(error, 'error'))
}

function editUser(user_id, token) {
    let body = {
        name: name_element.value,
        lastname: lastname_element.value,
        id: id_element.value,
        email: email_element.value,
        role: [role_element.value]
    }
    if (password_element.value) {
        body.password = password_element.value;
    }
    fetch("http://localhost:10000/api/users/" + user_id, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "x-access-token": token
        }
    })
    .then((response) => response.json())
    .then((json) => {
        alert("Usuario Actualizado exitosamente");
        console.log(json, 'json');
    } )
    .catch(error => console.error('There was an error!', error))
}

window.addEventListener('DOMContentLoaded', event => {
    
    const tokenValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    console.log(tokenValue);

    let params = new URLSearchParams(document.location.search);
    let user_id = params.get("u");
    console.log(user_id);
    getUser(user_id);

    const editBtn = document.getElementById("editBtn");

    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editUser(user_id, tokenValue);
    });
});
