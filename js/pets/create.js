window.addEventListener('DOMContentLoaded', event => { // escuchador de eventos, con el DOMContentLoaded cuando se cargue el contenido

    const btn = document.getElementById("btn_createPet"); // evento asignado con el id del boton

    function createPet() {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
        var animalType_element = document.getElementById('animalType'); // se obtiene el dato ingresado 
        var animalType = animalType_element.value; //se guarda en la variable el valor ingresado.
        var name_element = document.getElementById("name")
        var name = name_element.value;
        var gender_element = document.getElementById("gender")
        var gender = gender_element.value;
        var years_element = document.getElementById("years");
        var years = years_element.value;
        var birthDate_element = document.getElementById("birthDate");
        var birthDate = birthDate_element.value;
        var dx_element = document.getElementById("dx");
        var dx = dx_element.value;
        var photo_element = document.getElementById("photo");
        var photo = photo_element.value;

        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        fetch("http://localhost:3000/api/pets", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                animalType: animalType,
                name: name,
                gender: gender,
                years: years,
                birthDate: birthDate,
                dx: dx,
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

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        createPet();
    });
});
