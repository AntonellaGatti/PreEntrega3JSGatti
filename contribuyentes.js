///// API AFIP - CUIT CONTRIBUYENTES 

async function mostrarContribuyente() {
    const cuit = document.getElementById("inputCuit").value;
    const url = `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=${cuit}`;

    if (cuit == "" || cuit.length !== 11 || isNaN(cuit)) {
        
        Swal.fire({
            title: "Atención",
            text: `El CUIT ingresado no es válido. Por favor ingresar 11 dígitos numéricos`,
            icon: "warning",
        });
        document.getElementById("inputCuit").value = ""; 
    } else
        try {
            const response = await fetch(url);
            if (!response.ok && response) {
                throw new Error();
            }
            const user = await response.json();
            console.log(user.Contribuyente);
            document.getElementById("razonSocial").value = user.Contribuyente.nombre;
            mostrarContribuyenteTabla(user.Contribuyente.nombre)
        } catch (error) {
            console.log("Error:", error.message);
            Swal.fire({
                title: "Atención",
                text: `El CUIT ingresado no está registrado. Por favor ingreselo nuevamente.`,
                icon: "error",
            });
            document.getElementById("inputCuit").value = "";
        };
};

document.getElementById("inputCuit").addEventListener("blur", mostrarContribuyente);

function mostrarContribuyenteTabla (nombre) {
     let infoRazonSocial = document.getElementById("infoRazonSocial");
     infoRazonSocial.innerHTML = `${nombre}, en base a los datos proporcionados tu cotización es la siguiente:`

}
