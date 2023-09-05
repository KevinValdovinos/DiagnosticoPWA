const url = "https://reqres.in/api/users?page=2";
const listaUsuarios = document.getElementById("ListaUsuarios");

fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        let personas = data.data;
        let row = document.createElement("div");
        row.classList.add("row");

        personas.forEach((user) => {
            let card = document.createElement("div");
            card.classList.add("card", "col-3", "mb-3");

            let img = document.createElement("img");
            img.src = user.avatar;
            
            img.classList.add("card-img-top");

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let nombre = document.createElement("h4");
            nombre.classList.add("card-title");
            nombre.textContent = user.first_name + " " + user.last_name;

            let email = document.createElement("p");
            email.classList.add("card-text");
            email.textContent = "Email: " + user.email;

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger", "mr-2" );
            deleteBtn.textContent = "Eliminar";
            deleteBtn.style.marginRight = "10px";
            deleteBtn.addEventListener("click", function () {
                eliminarUsuario(user.id);
                card.remove();
            });

            let updateBtn = document.createElement("button");
            updateBtn.classList.add("btn", "btn-primary");
            updateBtn.textContent = "Actualizar";
            updateBtn.addEventListener("click", function () {
                updatePersona(user.id);
            });
            cardBody.appendChild(nombre);
            cardBody.appendChild(email);
            cardBody.appendChild(deleteBtn);
            cardBody.appendChild(updateBtn);
            card.appendChild(img);
            card.appendChild(cardBody);
            row.appendChild(card);
        });

        listaUsuarios.appendChild(row);
    })
    .catch(function () { });



function crearTarjetaUsuario(user) {
    let card = document.createElement("div");
    card.classList.add("card", "col-3", "mb-3");

    let img = document.createElement("img");
    img.src = user.avatar;
    img.classList.add("card-img-top");
    img.alt = user.first_name;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = user.first_name + " " + user.last_name;

    let email = document.createElement("p");
    email.classList.add("card-text");
    email.textContent = "Email: " + user.email;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger", "mr-2");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.style.marginRight = "10px";
    deleteBtn.addEventListener("click", function () {
        eliminarUsuario(user.id);
        card.remove();
    });

    let updateBtn = document.createElement("button");
    updateBtn.classList.add("btn", "btn-primary");
    updateBtn.textContent = "Actualizar";
    updateBtn.addEventListener("click", function () {
        updatePersona(user.id);
    });

    cardBody.appendChild(title);
    cardBody.appendChild(email);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(updateBtn);
    card.appendChild(img);
    card.appendChild(cardBody);
    return card;
}

const eliminarUsuario = async id => {
    await fetch('https://reqres.in/api/users/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "appliaction/json"
        }
    }).then(() => {
        alert("Persona eliminada con éxito.");
        card.remove();
    }).catch(() => {
        getErrorResponse();
    });
}

function agregarUsuario() {
    const firstName = document.getElementById("nombre").value;
    const lastName = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const avatar = document.getElementById("foto").value;

    const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        avatar: avatar,
    };

    fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error("Error al agregar el usuario");
            }
        })
        .then((data) => {
            let listaUsuarios = document.getElementById("ListaUsuarios");
            listaUsuarios.appendChild(crearTarjetaUsuario(data));
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("email").value = "";
            document.getElementById("foto").value = "";

            alert("Usuario agregado con éxito.");
        })
        .catch((error) => {
            console.error(error);
            alert("Error al agregar el usuario.");
        });
}
document.getElementById("guardarUsuario").addEventListener("click", agregarUsuario);

const updatePersona = async id => {
    $('#myModal').modal('show');
    let person = {
        first_name: document.getElementById('nombre').value,
        last_name: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        avatar: document.getElementById('foto').value
    }

    await fetch('https://reqres.in/api/users/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "appliaction/json"
        },
        body: JSON.stringify(person)
    }).then(() => {
        alert("Usuario actualizado con éxito.");
    }).catch(() => {  
        alert("Error al agregar el usuario.");
    });
}
