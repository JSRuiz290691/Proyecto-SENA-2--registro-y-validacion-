const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

function deleteUser(e) {
    let user_id = e.getAttribute('ref');
    fetch("http://localhost:10000/api/users/" + user_id, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token
        }
    })
    .then()
    .then(() => {
        alert("Usuario Eliminado exitosamente");
        location.reload();
    })
    .catch(error => console.log(error, 'error'));
}

function goToEdit(e) {
    let user_id = e.getAttribute('ref');
    location.href ='edit.html?u=' + user_id;
}


window.addEventListener('DOMContentLoaded', event => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    let url = "http://localhost:10000/api/users"; // se hace referencia al origen de los datos 
    fetch(url, {// se hace solicitud a la url
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => {
            console.log(response.status);
            if (response.status == 403) {
                alert('Usuario no autorizado');
            } else {
                return response.json();
            }
        }) // recibe la respuesta y la pasa a formato json
        .then(data =>mostrarData(data)) // se lee el objeto data y se pasa por consola
        .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const mostrarData = (data) => {

        let body = "";
        for (var i = 0; i < data.length; i++) {
            body+=`<tr><td>${data[i].name}</td>
                <td>${data[i].lastname}</td>
                <td>${data[i].id}</td>
                <td>${data[i].email}</td>
                <td>${data[i].roles[0].name}</td>
                <td>
                    <button class="btn btn-primary"ref="${data[i]._id}" onclick="goToEdit(this)" type="button">Editar</button>
                    <button class="btn btn-danger" ref="${data[i]._id}" onclick="deleteUser(this)" type="button">Eliminar</button>
                </td>
                <tr>`;
        }
        document.getElementById('data').innerHTML = body;
        
    }

});
