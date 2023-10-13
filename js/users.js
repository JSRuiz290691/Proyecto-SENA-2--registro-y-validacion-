function deleteUser(e) {
    let user_id = e.getAttribute('ref');
    fetch("http://localhost:10000/api/users/" + user_id, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then()
    .then(() => {
        alert("Usuario Eliminado exitosamente");
    })
    .catch(error => console.log(error, 'error'));
}

window.addEventListener('DOMContentLoaded', event => {

    let url = "http://localhost:10000/api/users" // se hace referencia al origen de los datos 
    fetch(url) // se hace solicitud a la url
        .then(response => response.json()) // recibe la respuesta y la pasa a formato json
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
                    <button class="btn btn-primary"ref="${data[i]._id}" id="editBtn" type="button">Editar</button>
                    <button class="btn btn-danger" ref="${data[i]._id}" onclick="deleteUser(this)" type="button">Eliminar</button>
                </td>
                <tr>`;
        }
        document.getElementById('data').innerHTML = body;

        //const editBtn = document.getElementById("editBtn");
        // const deleteBtn = document.getElementsByClassName("deleteBtn");

        /* editBtn.addEventListener("click", (e) => {
            e.preventDefault();
        }); */

        /* deleteBtn.addEventListener("click", (e) => {
            console.log('listener');
            e.preventDefault();
            console.log(e.getAttribute('ref'));
            //deleteUser(e.getAttribute('ref'));
        }); */
    }

});
