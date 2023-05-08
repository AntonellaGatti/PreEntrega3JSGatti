let carrito = []


let btnSubmit = document.getElementById("btnSubmit");
// btnSubmit.addEventListener("click", cargarUnItem);

//CARGAR CARRITO CON INFO ANTERIOR DEL JSON
document.addEventListener("DOMContentLoaded", () => {
    const historial = JSON.parse(localStorage.getItem("carrito"));
    if (historial != null) {
        carrito = historial;
    }
    mostrarCotizacion();
});


// MOSTRAR RANGO DE PRECIO EN BASE A LOS KM
let mostrarRango = document.getElementById("cantidadKm");
mostrarRango.addEventListener("input", () => {
    if (parseFloat(mostrarRango.value) > 0 && (parseFloat(mostrarRango.value)) <= 500) {
        document.getElementById("rangoPrecio").innerHTML = `5 USD`;
    } else if ((parseFloat(mostrarRango.value)) > 500 && (parseFloat(mostrarRango.value) <=1500)){
        document.getElementById("rangoPrecio").innerHTML = `10 USD`;
    } else if (parseFloat(mostrarRango.value) <= 0 || mostrarRango.value == ""){
        document.getElementById("rangoPrecio").innerHTML = `Sin rango asignado`;
    }else {
        document.getElementById("rangoPrecio").innerHTML = `15 USD`;
    }
    
});


//FUNCION PARA CARGAR ITEMS
function cargarUnItem() {
    const nuevoItem = new itemCarga();
    nuevoItem.tipoDeEmbalaje = document.querySelector("#formularioCoti select[name='Embalaje']").value;
    nuevoItem.cantidadDeUnidades = document.getElementById("cantidadU").value;
    nuevoItem.largo = document.getElementById("largo").value;
    nuevoItem.ancho = document.getElementById("ancho").value;
    nuevoItem.alto = document.getElementById("alto").value;
    nuevoItem.cbm = nuevoItem.largo * nuevoItem.ancho * nuevoItem.alto * nuevoItem.cantidadDeUnidades;
    nuevoItem.cantidadKm = document.getElementById("cantidadKm").value;

    // FUNCION PARA DETERMINAR EL PRECIO DEL TRANSPORTE EN BASE A LOS KM
        let rangoPrecio = () => {
            if (nuevoItem.cantidadKm > 0 && nuevoItem.cantidadKm <= 500) {
                precioTransporte = parseFloat(5)
            } else if (nuevoItem.cantidadKm > 500 && nuevoItem.cantidadKm <= 1500) {
                precioTransporte = parseFloat(10)
            } else { precioTransporte = parseFloat(15) }
            console.log(precioTransporte);
            return precioTransporte;
        };
    nuevoItem.precioTransporte = rangoPrecio() * nuevoItem.cbm * nuevoItem.cantidadKm;

    carrito.push(nuevoItem);
    console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCotizacion();
    formularioCoti.reset();

}

// TRAER AL FORMULARIO PARA LUEGO LLAMAR Y BORRAR LOS DATOS 
const formularioCoti = document.getElementById("formularioCoti");

// FUNCIONES PARA VALIDAR CAMPOS DEL FORMULARIO
function validarCampo(idInput, idRespuesta) {
    let validCampo = document.getElementById(idInput).value;
    if (validCampo <= 0 || validCampo === "") {
        document.getElementById(idRespuesta).innerHTML = "No puede ser 0 o vacío";
    } else {
        document.getElementById(idRespuesta).innerHTML = " ";
    }
};

// VALIDAR FORMULARIO ENTERO
let validEmbalaje = document.querySelector("#formularioCoti select[name='Embalaje']");
let validCantU = document.getElementById("cantidadU");
let validLargo = document.getElementById("largo");
let validAncho = document.getElementById("ancho");
let validAlto = document.getElementById("alto");
let validKM = document.getElementById("cantidadKm")

formularioCoti.addEventListener("submit", e=> {
    e.preventDefault()
    let error = false; 
    let mensajeError = []

    if (validEmbalaje.value === "Por favor seleccione un tipo de Embalaje"){
        mensajeError.push('Tipo de Embalaje'),
        error = true;
    }


    if (validCantU.value <= 0 ||validCantU.value === ""){
        mensajeError.push(`la Cantidad de Unidades`),
        error = true;
    };
    if (validLargo.value <= 0 ||validLargo.value === ""){
        mensajeError.push(`el Largo`),
        error = true;
    };
    if (validAncho.value <= 0 ||validAncho.value === ""){
        mensajeError.push(`el Ancho`),
        error = true;
    };
    if (validAlto.value <= 0 ||validAlto.value === ""){
        mensajeError.push(`el Alto`),
        error = true;
    };
    if (validKM.value <= 0 ||validKM.value === ""){
        mensajeError.push(`la cantidad de Kilómetros`)
        error = true;
    };

    if (error === false) {
        console.log(" no hubo error")
        cargarUnItem();
        formularioCoti.reset();
    } else {
        console.log(" hubo error");
        formularioCoti.reset();
        Swal.fire(
            {
                title: "Atención",
                text: `Falta ingresar: \n\n${mensajeError.join(`, `)}`,
                icon: "warning",
            })
    }
});




// FUNCION PARA MOSTRAR LA COTIZACION EN TABLA
function mostrarCotizacion() {
    let table = document.getElementById("items");
    table.innerHTML = "";
    let counter = 1;
    let totalCarrito = 0;

    carrito.forEach((item) => {
        table.innerHTML +=
            `
            <tr>
                <th scope="row">${counter}</th>
                <td>${item.tipoDeEmbalaje}</td>
                <td>${item.cantidadDeUnidades} u.</td>
                <td>${item.largo} m</td>
                <td>${item.ancho} m</td>
                <td>${item.alto} m</td>
                <td>${item.cbm} cbm</td>
                <td>${item.cantidadKm} Km</td>
                <td>${item.precioTransporte} USD</td>
                <td>${totalCarrito += item.precioTransporte} USD</td>
            </tr>
        `

        counter++;
    });

};


// FUNCION PARA BUSCAR UN ITEM EN EL ARRAY Y ELIMINARLO
let btnBuscarYBorrar = document.getElementById("borrarItem");
btnBuscarYBorrar.addEventListener("click", buscarYBorrarItem);

function buscarYBorrarItem() {
    Swal.fire(
        {
            title: "ITEM A BORRAR",
            text: "Por favor ingrese el item que desea elimianar",
            input: "text",
            confirmButtonText: "Siguiente",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        })

        .then((resultado) => {
            if (resultado.dismiss === Swal.DismissReason.cancel) {
                console.log("El usuario cierra el swall sin borrar nada");
                return;
            }

            let itemABuscar = resultado.value;
            console.log(itemABuscar)
            let indiceAEliminar = -1;

            carrito.forEach((item, index) => {
                if (item.tipoDeEmbalaje === itemABuscar) {
                    indiceAEliminar = index;
                }
            });


            if (indiceAEliminar > -1) {
                carrito.splice(indiceAEliminar, 1);
                Swal.fire(
                    {
                        title: "Item eliminado con exito de la cotizacion!",
                        text: `Se eliminó el elemento con tipo de embalaje "${itemABuscar}" del carrito`,
                        icon: "success",
                    }).then(() => {
                        console.log(carrito)
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        mostrarCotizacion();
                    });
            }
            else {
                Swal.fire(
                    {
                        title: "Atención!",
                        text: `No se encontró ningún elemento con tipo de embalaje "${itemABuscar}" en el carrito`,
                        icon: "warning",
                    });
            }

        });
};





// FUNCION PARA VACIAR EL CARRITO Y ELIMINAR EL LOCAL STORAGE, LUEGO MOSTRAR EN LA TABLA
let btnVaciarCotizacion = document.getElementById("vaciarCotizacion");
btnVaciarCotizacion.addEventListener("click", vaciarCotizacion);

function vaciarCotizacion() {
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire(
        {
            title: "Usted ha borrado la cotizacion!",
            icon: "success",
        });
    mostrarCotizacion();
};
