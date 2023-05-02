class itemCarga {
    tipoDeEmbalaje;
    cantidadDeUnidades;
    largo;
    ancho;
    alto;
    cbm;
    cantidadKm;
    precioTransporte;


    constructor(tipoDeEmbalaje, largo, ancho, alto, cbm, cantidadKm, precioTransporte) {
        this.tipoDeEmbalaje = tipoDeEmbalaje;
        this.cantidadDeUnidades = this.cantidadDeUnidades;
        this.largo = largo;
        this.ancho = ancho;
        this.alto = alto;
        this.cbm = "";
        this.cantidadKm = cantidadKm;
        this.precioTransporte = precioTransporte;
    }


    //METODO 
    cotizacionItemCarga () {
        return this.cbm * this.cantidadKm * this.precioTransporte;
    };

};
