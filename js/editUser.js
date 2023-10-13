window.addEventListener('DOMContentLoaded', event => {

    const editBtn = document.getElementById("editBtn");

    function editUser(user_id) {
        fetch("http://localhost:3000/api/users/" + user_id, {
            method: "PUT",
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
            alert("Usuario Actualizado exitosamente");
            console.log(json, 'json');
        } )
        .catch(error => console.log(error, 'error'))
    }

    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editUser(e.getAttribute('ref'));
    });
});
