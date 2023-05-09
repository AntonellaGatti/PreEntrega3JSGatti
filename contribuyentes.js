
function mostrarContribuyente() {
    let cuit = document.getElementById("inputCuit").value;
    let url = `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=${cuit}`;

    if (cuit !== "") {

        fetch(url)
            .then(function (response) {
                if (!response.ok && response) {
                    throw new Error();
                }
                return response.json();
            })
            .then(function (user) {
                console.log(user.Contribuyente);
                document.getElementById("razonSocial").value = user.Contribuyente.nombre;
            })
            .catch(function (error) {
                console.log("Error:", error.message);
                Swal.fire(
                    {
                        title: "Atención",
                        text: `El cuit ingresado no está registrado, por favor ingrese nuevamente.`,
                        icon: "error",
                    })
                document.getElementById("inputCuit").value = "";
            });
    }
};

document.getElementById("inputCuit").addEventListener("blur", mostrarContribuyente);
