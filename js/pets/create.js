window.addEventListener('DOMContentLoaded', event => { // escuchador de eventos, con el DOMContentLoaded cuando se cargue el contenido
    
    var animalType_element = document.getElementById('animalType'); // se obtiene el dato ingresado 
    var name_element = document.getElementById("name");
    var gender_element = document.getElementById("gender");
    var years_element = document.getElementById("years");
    var birthDate_element = document.getElementById("birthDate");
    var characteristicsPet_element = document.getElementById("characteristicsPet");
    var photo_element = document.getElementById("photo");

    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

    let urlusers = "http://localhost:3000/api/users"; // se hace referencia al origen de los datos 
        fetch(urlusers, { // se hace solicitud a la url
            headers: { // cuando no se asigna metodo, por descarte toma GET
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "x-access-token": token
            }
        })
        .then(response => {
            console.log(response.status);
            if (response.status == 403) {
                alert('Usuario no autorizado');
                location.href = '/index.html';
            } else {
                return response.json();
            }
        }) // recibe la respuesta y la pasa a formato json
        .then(data => {
        }) 
        .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch


    const btn = document.getElementById("btn_createPet"); // evento asignado con el id del boton

    function createPet() {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
        var error_msg = '';
        var animalType = animalType_element.value; //se guarda en la variable el valor ingresado.
        if (animalType.length == 0) {
            error_msg += 'Debe ingresar un Tipo de Animal -';
        }
        var name = name_element.value;
        if (name.length == 0) {
            error_msg += 'Debe ingresar Nombre de Animal -';
        }
        var gender = gender_element.value;
        if (gender.length == 0) {
            error_msg += 'Debe ingresar el Genero del Animal -';
        }
        var years = years_element.value;
        if (years.length == 0) {
            error_msg += 'Debe ingresar la edad de la mascota -';
        }
        var birthDate = birthDate_element.value;
        if (birthDate.length == 0) {
            error_msg += 'Debe ingresar la fecha de nacimiento de la mascota -';
        }
        var characteristicsPet = characteristicsPet_element.value;
        if (characteristicsPet.length == 0) {
            error_msg += 'Debe ingresar las caracteristicas de la mascota -';
        }
        var photo = photo_element.value;
        if (error_msg.length != 0) {
            alert(error_msg);
        }else{
            fetch("http://localhost:3000/api/pets", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                animalType: animalType,
                name: name,
                gender: gender,
                years: years,
                birthDate: birthDate,
                characteristicsPet: characteristicsPet,
                photo: photo
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            alert("Mascota creada exitosamente"); //envia mensaje que confirma la creacion del usuario
            console.log(json, 'json');
            location.href = '/index.html';
        })
        .catch(error => console.log(error, 'error'))
        }
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        createPet();
    });
});
