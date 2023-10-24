let listaDePersonas = JSON.parse(localStorage.getItem('personas')) || [];
let listaDeMascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const d=document;

if (listaDeMascotas) {
    mostrarMascotas();
}

if (listaDePersonas) {
    mostrarPersonas();
}

class Persona {
    constructor(id, nombre, edad, mascotas) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.mascotas = mascotas || [];
    }

    // Método para crear una nueva persona
    static crearPersona(id, nombre, edad) {
        const nuevaPersona = new Persona(id, nombre, edad);
        // Agregar la nueva persona a una lista de personas (puedes usar un array).
        listaDePersonas.push(nuevaPersona);
        alert('persona creada');
        localStorage.setItem('personas',JSON.stringify(listaDePersonas));
    }

    // Método para leer (obtener) una persona por su ID
    static obtenerPersonaPorId(id) {
        return listaDePersonas.find((persona) => persona.id === id);
    }

    // Método para actualizar los datos de una persona
    actualizarPersona(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // Método para eliminar una persona por su ID
    static eliminarPersona(id) {
        const index = listaDePersonas.findIndex((persona) => persona.id === id);
        if (index !== -1) {
            listaDePersonas.splice(index, 1);
            localStorage.setItem('personas', JSON.stringify(listaDePersonas));
        }
    }

    static comprarMascota(mascota)
    {
        let id=prompt('digite el id del usuario que va a comprar la mascota: ');
        let usuarioEncontrado = false;

        for (let i = 0; i < listaDePersonas.length; i++) {
            const persona = listaDePersonas[i];
            if (id == persona.id) {
                usuarioEncontrado = true;
                persona.mascotas.push(mascota);
                localStorage.setItem('personas', JSON.stringify(listaDePersonas));
            }
        }
        if (usuarioEncontrado==false) {
            alert('no se encontró el usuario');
        }
    }
}

class Mascota {
    constructor(nombre, tipo, raza) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.raza = raza;
    }

    // Método para crear una nueva mascota
    static crearMascota(nombre, tipo, raza) {
        const nuevaMascota = new Mascota(nombre, tipo, raza);
        // Agregar la nueva mascota a una lista de mascotas (puedes usar un array).
        listaDeMascotas.push(nuevaMascota);
        localStorage.setItem('mascotas', JSON.stringify(listaDeMascotas));
    }

    // Método para leer (obtener) una mascota por su nombre
    static obtenerMascotaPorNombre(nombre) {
        return listaDeMascotas.find((mascota) => mascota.nombre === nombre);
    }

    // Método para actualizar los datos de una mascota
    actualizarMascota(tipo, raza) {
        this.tipo = tipo;
        this.raza = raza;
    }

    // Método para cambiar los datos de una mascota
    cambiarMascota(tipo, raza) {
        this.tipo = tipo;
        this.raza = raza;
    }

    // Método para eliminar una mascota por su nombre
    static eliminarMascota(nombre) {
        const index = listaDeMascotas.findIndex((mascota) => mascota.nombre === nombre);
        if (index !== -1) {
            listaDeMascotas.splice(index, 1);
            localStorage.setItem('mascotas', JSON.stringify(listaDeMascotas));
        }
    }
}


function agregarPersonas() {
    let nombrePersona=d.getElementById('nombre-persona').value,
        edadPersona=d.getElementById('edad-persona').value,
        idPersona=d.getElementById('id-persona').value;
    
    Persona.crearPersona(idPersona, nombrePersona, edadPersona);
    mostrarPersonas();
}

function mostrarPersonas() {
    let listaPersonas=d.getElementById('lista-personas');
    listaPersonas.innerHTML='';
    listaPersonas.style.visibility='visible';
    for (let i = 0; i < listaDePersonas.length; i++) {
        const persona = listaDePersonas[i];
        let dato=`
        <li>
            ${persona.nombre} 
            <button id="eliminar-personas" onclick="eliminarPersonas('${persona.id}')">Eliminar</button>
            <button id="modificar-personas" onclick="modificarPersonas('${persona.id}', '${persona.nombre}', ${persona.edad})">Modificar</button>
        </li>
        `;
        listaPersonas.innerHTML+=dato;
    }
    if (listaDePersonas.length<=0) {
        listaPersonas.style.visibility='hidden';
    }
}

function eliminarPersonas(id)
{
    Persona.eliminarPersona(id);
    mostrarPersonas();
}

function modificarPersonas(id,nombre,edad) {
    d.getElementById('nombre-persona').value=nombre;
    d.getElementById('edad-persona').value=edad;
    d.getElementById('id-persona').value=id;

    // Agregar un manejador de eventos para el botón de "Guardar cambios"
    d.getElementById('guardar-cambios').onclick = function() {
        // Capturar los datos actualizados desde el formulario
        let nuevoNombre = d.getElementById('nombre-persona').value;
        let nuevaEdad = d.getElementById('edad-persona').value;

        // Encontrar la persona correspondiente en la lista
        let personaAActualizar = Persona.obtenerPersonaPorId(id);

        if (personaAActualizar) {
            // Utilizar los datos actualizados para actualizar la instancia de la persona
            personaAActualizar.actualizarPersona(nuevoNombre, nuevaEdad);

            // Guardar los cambios en el almacenamiento local (localStorage)
            localStorage.setItem('personas', JSON.stringify(listaDePersonas));

            // Limpiar el formulario
            d.getElementById('nombre-persona').value = '';
            d.getElementById('edad-persona').value = '';
            d.getElementById('id-persona').value = '';

            // Volver a mostrar la lista de personas
            mostrarPersonas();
        }
    };
    
}

function agregarMascotas() {
    let nombreMascota=d.getElementById('nombre-mascota').value,
        tipoMascota=d.getElementById('tipo-mascota').value,
        razaMascota=d.getElementById('raza-mascota').value;

    Mascota.crearMascota(nombreMascota,tipoMascota,razaMascota);
    mostrarMascotas();
}

function mostrarMascotas()
{
    let listaMascotas=d.getElementById('lista-mascotas');
    listaMascotas.innerHTML='';
    listaMascotas.style.visibility='visible';
    for (let i = 0; i < listaDeMascotas.length; i++) {
        const mascota = listaDeMascotas[i];
        let dato=`
        <li>
            ${mascota.nombre}
            <button id="eliminar-mascotas" onclick="eliminarMascotas('${mascota.nombre}')">Eliminar</button>
            <button id="modificar-mascotas" onclick="modificarMascotas('${mascota.nombre}', '${mascota.tipo}', '${mascota.raza}')">Modificar</button>
            <button id="comprar-mascota">Comprar</button>
        </li>
        `;
        listaMascotas.innerHTML+=dato;
    }
    if (listaDeMascotas.length<=0) {
        listaMascotas.style.visibility='hidden';
    }
    const botonesCompra = d.querySelectorAll('#comprar-mascota');

    botonesCompra.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            // Accede a los datos del videojuego en función del índice
            const mascotaSeleccionado = listaDeMascotas[index];
            // Haz lo que necesites con los datos del videojuego seleccionado
            console.log('Videojuego seleccionado:', mascotaSeleccionado);
            Persona.comprarMascota(mascotaSeleccionado);
        });
    });

}

function eliminarMascotas(nombre)
{
    Mascota.eliminarMascota(nombre);
    mostrarMascotas();
}

function modificarMascotas(nombre, tipo, raza) {
    d.getElementById('nombre-mascota').value = nombre;
    d.getElementById('tipo-mascota').value = tipo;
    d.getElementById('raza-mascota').value = raza;

    // Mostrar el botón "Guardar"
    d.getElementById('guardar-cambios-mascota').style.display = 'block';

    // Agregar un manejador de eventos para el botón de "Guardar cambios"
    d.getElementById('guardar-cambios-mascota').onclick = function () {
        // Capturar los datos actualizados desde el formulario
        let nuevoTipo = d.getElementById('tipo-mascota').value;
        let nuevaRaza = d.getElementById('raza-mascota').value;

        // Encontrar la mascota correspondiente en la lista
        let mascotaEncontrada = Mascota.obtenerMascotaPorNombre(nombre);
        if (mascotaEncontrada) {
            // Utilizar los datos actualizados para actualizar la instancia de la mascota
            mascotaEncontrada.cambiarMascota(nuevoTipo, nuevaRaza);
            // Guardar los cambios en el almacenamiento local (localStorage)
            localStorage.setItem('mascotas', JSON.stringify(listaDeMascotas));

            // Limpiar el formulario
            d.getElementById('nombre-mascota').value = '';
            d.getElementById('tipo-mascota').value = '';
            d.getElementById('raza-mascota').value = '';

            // Ocultar nuevamente el botón "Guardar"
            d.getElementById('guardar-cambios-mascota').style.display = 'none';

            // Volver a mostrar la lista de personas
            mostrarMascotas();
        }
    };
}

// function obtenerMascota(mascota) {
//     Persona.comprarMascota(mascota);
// }
